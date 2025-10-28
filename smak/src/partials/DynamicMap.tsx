import { useEffect, useRef, useState } from "react";
import Map, { Source, Layer, Marker, type MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import config from "../config/Config";
import MapMarker from "../components/MapMarker";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface DynamicMapProps {
  from: { name: string; coordinates: [number, number] } | null;
  to: { name: string; coordinates: [number, number] } | null;
  className?: string;
  centerOnFrom?: boolean;
  isLoginPage?: boolean;
}

export default function DynamicMap({
  from,
  to,
  className = "",
  centerOnFrom = false,
  isLoginPage = false
}: DynamicMapProps) {
  const [route, setRoute] = useState<any>(null);
  const mapRef = useRef<MapRef>(null);
  const mapPadding = 140;

  // Center on "from" location when triggered by button
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
        mapRef.current?.fitBounds(bounds, { duration: 1000, padding: mapPadding });
      } else if (from) {
        mapRef.current.flyTo({ center: from.coordinates, zoom: 10, duration: 1000 });
      } else if (to) {
        mapRef.current.flyTo({ center: to.coordinates, zoom: 10, duration: 1000 });
      } else {
        mapRef.current.flyTo({
          center: [16.18071635577292, 58.589806397406655],
          zoom: 10,
          duration: 1000
        });
      }
    }
  }, [centerOnFrom, from, to]);

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

  useEffect(() => {
    if (from && !to) {
      mapRef.current?.flyTo({ center: from.coordinates, zoom: 10 });
    } else if (to && !from) {
      mapRef.current?.flyTo({ center: to.coordinates, zoom: 10 });
    }
  }, [from, to]);

  return (
    <div className={`${className} w-100 h-100`}>
      <Map
        ref={mapRef} // startvärde Världens bar
        initialViewState={{
          longitude: 16.18071635577292,
          latitude: 58.589806397406655,
          zoom: isLoginPage ? 0 : config.initialMapZoomLevel,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        pitchWithRotate={false}
        touchPitch={false}
        dragRotate={false}
        scrollZoom={!isLoginPage}
        doubleClickZoom={!isLoginPage}
        boxZoom={!isLoginPage}
        keyboard={!isLoginPage}>

        {from && (
          <Marker
            longitude={from.coordinates[0]}
            latitude={from.coordinates[1]}
            anchor="bottom">
            <MapMarker />
          </Marker>
        )}

        {to && (
          <Marker
            longitude={to.coordinates[0]}
            latitude={to.coordinates[1]}
            anchor="bottom">
            <MapMarker />
          </Marker>
        )}

        {from && to && route && (
          <Source id="route" type="geojson" data={route}>
            <Layer
              id="route-line"
              type="line"
              paint={{
                "line-color": "#016D85",
                "line-width": 4,
              }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
}
