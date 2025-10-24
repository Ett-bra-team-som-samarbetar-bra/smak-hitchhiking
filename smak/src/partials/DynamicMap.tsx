import { useEffect, useRef, useState } from "react";
import Map, { Source, Layer, Marker, type MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface DynamicMapProps {
  from: { name: string; coordinates: [number, number] } | null;
  to: { name: string; coordinates: [number, number] } | null;
  className?: string;
}

export default function DynamicMap({ from, to, className = "" }: DynamicMapProps) {
  const [route, setRoute] = useState<any>(null);
  const mapRef = useRef<MapRef>(null);

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
        mapRef.current?.fitBounds(bounds, { padding: 60, duration: 1000 });
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
          zoom: 8,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {from && (
          <Marker
            longitude={from.coordinates[0]}
            latitude={from.coordinates[1]}
          >
            <div
              className="bg-success rounded-circle"
              style={{
                width: "16px",
                height: "16px",
                border: "2px solid white",
              }}
              title={from.name}
            />
          </Marker>
        )}

        {to && (
          <Marker
            longitude={to.coordinates[0]}
            latitude={to.coordinates[1]}
            anchor="bottom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="26"
              height="26"
              fill="#FF4136"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
          </Marker>
        )}

        {from && to && route && (
          <Source id="route" type="geojson" data={route}>
            <Layer
              id="route-line"
              type="line"
              paint={{
                "line-color": "#007cbf",
                "line-width": 4,
              }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
}
