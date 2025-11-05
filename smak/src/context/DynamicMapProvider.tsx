import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from 'react';
import type { MapRef } from "react-map-gl/mapbox";
import config from '../config/Config';

interface DynamicMapContextType {
  from: { name: string; coordinates: [number, number] } | null;
  to: { name: string; coordinates: [number, number] } | null;
  route: any;
  className: string;
  centerOnFrom: boolean;
  isLoginPage: boolean;
  triggerLoginZoom: boolean;
  hasLoginAnimationCompleted: boolean;
  mapRef: React.RefObject<MapRef | null>;

  // Setters
  setFrom: (from: { name: string; coordinates: [number, number] } | null) => void;
  setTo: (to: { name: string; coordinates: [number, number] } | null) => void;
  setClassName: (className: string) => void;
  setCenterOnFrom: (center: boolean) => void;
  setIsLoginPage: (isLogin: boolean) => void;
  setTriggerLoginZoom: (trigger: boolean) => void;

  // Methods
  resetMap: () => void;
  centerMapOnLocations: () => void;
}

const DynamicMapContext = createContext<DynamicMapContextType | undefined>(undefined);

export const useDynamicMap = () => {
  const context = useContext(DynamicMapContext);
  if (context === undefined) {
    throw new Error("useDynamicMap must be used within a DynamicMapProvider");
  }
  return context;
};

interface DynamicMapProviderProps {
  children: ReactNode;
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function DynamicMapProvider({ children }: DynamicMapProviderProps) {
  const [from, setFrom] = useState<{ name: string; coordinates: [number, number] } | null>(null);
  const [to, setTo] = useState<{ name: string; coordinates: [number, number] } | null>(null);
  const [route, setRoute] = useState<any>(null);
  const [className, setClassName] = useState("");
  const [centerOnFrom, setCenterOnFrom] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [triggerLoginZoom, setTriggerLoginZoom] = useState(false);
  const [hasLoginAnimationCompleted, setHasLoginAnimationCompleted] = useState(false);
  const mapRef = useRef<MapRef>(null);
  const bearingRef = useRef(190); // Spin animation start pos @ EU
  const mapPadding = 140;

  // Zoom in animation when user logs in
  useEffect(() => {
    if (triggerLoginZoom && mapRef.current) {
      mapRef.current.flyTo({
        center: [16.18071635577292, 58.589806397406655],
        zoom: config.initialMapZoomLevel,
        duration: config.MapZoomAnimationDuration
      });
      setTriggerLoginZoom(false);
      setHasLoginAnimationCompleted(true);
    }
  }, [triggerLoginZoom]);

  // Center map triggered by button on parent
  useEffect(() => {
    if (centerOnFrom && mapRef.current) {
      if (from && to) {
        const coords = [from.coordinates, to.coordinates];
        const longitudes = coords.map(c => c[0]);
        const latitudes = coords.map(c => c[1]);
        const bounds: [[number, number], [number, number]] = [
          [Math.min(...longitudes), Math.min(...latitudes)],
          [Math.max(...longitudes), Math.max(...latitudes)],
        ];
        mapRef.current?.fitBounds(bounds, { padding: mapPadding });
      } else if (from) {
        mapRef.current.flyTo({ center: from.coordinates, zoom: 10 });
      } else if (to) {
        mapRef.current.flyTo({ center: to.coordinates, zoom: 10 });
      } else {
        mapRef.current.flyTo({
          center: [16.18071635577292, 58.589806397406655],
          zoom: 10
        });
      }
    }
  }, [centerOnFrom, from, to]);

  // Auto center on single location
  useEffect(() => {
    if (from && !to) {
      mapRef.current?.flyTo({ center: from.coordinates, zoom: 10 });
    } else if (to && !from) {
      mapRef.current?.flyTo({ center: to.coordinates, zoom: 10 });
    }
  }, [from, to]);

  // Fetch route when from/to changes
  useEffect(() => {
    if (!from || !to) {
      setRoute(null);
      return;
    }

    const fetchRoute = async () => {
      try {
        const [fromLongitude, fromLatitude] = from?.coordinates;
        const [toLongitude, toLatitude] = to?.coordinates;
        const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${fromLongitude},${fromLatitude};${toLongitude},${toLatitude}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`;
        const res = await fetch(routeUrl);
        const data = await res.json();

        if (!data.routes?.length)
          return;

        //TODO return distance and duration

        const geometry = data.routes[0].geometry;
        setRoute(geometry);

        const coords = geometry.coordinates;
        const longitudes = coords.map((c: number[]) => c[0]);
        const latitudes = coords.map((c: number[]) => c[1]);
        const bounds: [[number, number], [number, number]] = [
          [Math.min(...longitudes), Math.min(...latitudes)],
          [Math.max(...longitudes), Math.max(...latitudes)],
        ];
        mapRef.current?.fitBounds(bounds, { padding: mapPadding, duration: 1000 });
      } catch (err) {
      }
    };

    fetchRoute();
  }, [from, to]);

  // Spin globe animation
  useEffect(() => {
    if (!config.enableGlobeAnimation) return;

    let animationId: number;
    let pollId: number;
    let spinning = false;
    let interacting = false;
    let rawMap: any;

    function spinGlobe() {
      if (!spinning || interacting) return;
      const mapbox = mapRef.current;
      if (mapbox && mapbox.getMap) {
        rawMap = mapbox.getMap();
        if (rawMap) {
          bearingRef.current += config.globeAnimationSpeed;
          const lng = (bearingRef.current % 360) - 180;
          rawMap.setCenter([lng, rawMap.getCenter().lat]);
        }
      }
      animationId = requestAnimationFrame(spinGlobe);
    }

    // Stop on left mouseBtn or touch
    function onMouseDown(e: any) {
      if (e.originalEvent && e.originalEvent.button === 0) {
        stopSpin();
      }
    }

    function onTouchStart() {
      stopSpin();
    }

    function stopSpin() {
      if (animationId) cancelAnimationFrame(animationId);
      spinning = false;
      interacting = true;
      if (rawMap) {
        rawMap.off('mousedown', onMouseDown);
        rawMap.off('touchstart', onTouchStart);
        rawMap.on('mouseup', startSpinAfterInteraction);
        rawMap.on('touchend', startSpinAfterInteraction);
      }
    }

    function startSpinAfterInteraction() {
      interacting = false;
      if (rawMap) {
        const lng = rawMap.getCenter().lng;
        bearingRef.current = lng + 180;
      }
      if (!spinning && isLoginPage) {
        spinning = true;
        spinGlobe();

        if (rawMap) {
          rawMap.off('mouseup', startSpinAfterInteraction);
          rawMap.off('touchend', startSpinAfterInteraction);
          rawMap.on('mousedown', onMouseDown);
          rawMap.on('touchstart', onTouchStart);
        }
      }
    }

    function tryStartSpin() {
      const mapbox = mapRef.current;
      rawMap = mapbox?.getMap?.();
      if (
        isLoginPage &&
        rawMap &&
        rawMap.isStyleLoaded &&
        rawMap.isStyleLoaded()
      ) {
        if (!spinning && !interacting) {
          spinning = true;
          spinGlobe();
          rawMap.on('mousedown', onMouseDown);
          rawMap.on('touchstart', onTouchStart);
        }
        clearInterval(pollId);
      }
    }

    // Poll every 200ms until map is loaded
    pollId = window.setInterval(tryStartSpin, 200);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (pollId) clearInterval(pollId);
      if (rawMap) {
        rawMap.off('mousedown', onMouseDown);
        rawMap.off('touchstart', onTouchStart);
        rawMap.off('mouseup', startSpinAfterInteraction);
        rawMap.off('touchend', startSpinAfterInteraction);
        rawMap.off('mouseout', startSpinAfterInteraction);
      }
    };
  }, [isLoginPage]);

  // Methods
  const resetMap = () => {
    setFrom(null);
    setTo(null);
    setRoute(null);
    setCenterOnFrom(false);
    setTriggerLoginZoom(false);
    setHasLoginAnimationCompleted(false);

    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [16.18071635577292, 58.589806397406655],
        zoom: 0.8,
        duration: 0
      });
    }
  };

  const centerMapOnLocations = () => {
    setCenterOnFrom(true);
    setTimeout(() => setCenterOnFrom(false), 100);
  };

  const value = {
    from,
    to,
    route,
    className,
    centerOnFrom,
    isLoginPage,
    triggerLoginZoom,
    hasLoginAnimationCompleted,
    mapRef,

    // Setters
    setFrom,
    setTo,
    setClassName,
    setCenterOnFrom,
    setIsLoginPage,
    setTriggerLoginZoom,

    // Methods
    resetMap,
    centerMapOnLocations
  };

  return (
    <DynamicMapContext.Provider value={value}>
      {children}
    </DynamicMapContext.Provider>
  );
}