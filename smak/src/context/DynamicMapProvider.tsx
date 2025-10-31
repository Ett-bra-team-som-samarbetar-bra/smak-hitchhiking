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

        if (!data.routes?.length) {
          console.warn("No route found");
          return;
        }

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
        console.error("Error fetching route:", err);
      }
    };

    fetchRoute();
  }, [from, to]);

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