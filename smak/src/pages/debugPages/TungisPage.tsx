import { useEffect, useRef, useState } from "react";
import Map, { Source, Layer, Marker, type MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function RouteFinder() {
  const [from, setFrom] = useState("Stockholm");
  const [to, setTo] = useState("Uppsala");
  const [route, setRoute] = useState<any>(null);
  const [start, setStart] = useState<number[] | null>(null);
  const [end, setEnd] = useState<number[] | null>(null);
  const mapRef = useRef<MapRef>(null);

  // Fetch route whenever from/to change
  const fetchRoute = async (fromCity: string, toCity: string) => {
    try {
      // 1️⃣ Geocode both cities
      const geocode = async (place: string) => {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            place
          )}.json?access_token=${MAPBOX_TOKEN}`
        );
        const data = await res.json();
        return data.features?.[0]?.geometry?.coordinates;
      };

      const [fromCoords, toCoords] = await Promise.all([
        geocode(fromCity),
        geocode(toCity),
      ]);

      if (!fromCoords || !toCoords) {
        alert("Could not find one of the locations.");
        return;
      }

      setStart(fromCoords);
      setEnd(toCoords);

      // 2️⃣ Fetch route between them
      const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${fromCoords[0]},${fromCoords[1]};${toCoords[0]},${toCoords[1]}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`;
      const res = await fetch(routeUrl);
      const data = await res.json();
      const newRoute = data.routes[0].geometry;
      setRoute(newRoute);

      // 3️⃣ Fit map to route
      const coords = newRoute.coordinates;
      const lons = coords.map((c: number[]) => c[0]);
      const lats = coords.map((c: number[]) => c[1]);
      const bounds: [[number, number], [number, number]] = [
        [Math.min(...lons), Math.min(...lats)],
        [Math.max(...lons), Math.max(...lats)],
      ];
      mapRef.current?.fitBounds(bounds, { padding: 60, duration: 1500 });
    } catch (err) {
      console.error("Error fetching route:", err);
    }
  };

  useEffect(() => {
    fetchRoute(from, to);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRoute(from, to);
  };

  return (
    <div style={{ height: "800px", width: "100%" }}>
      {/* 🧭 Controls */}
      <form
        onSubmit={handleSubmit}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1,
          background: "white",
          padding: "10px 15px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          display: "flex",
          gap: "8px",
        }}
      >
        <input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="From"
          style={{ padding: "6px 10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To"
          style={{ padding: "6px 10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#007cbf",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Go
        </button>
      </form>

      {/* 🗺️ Map */}
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 18.0632,
          latitude: 59.3346,
          zoom: 6,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {route && (
          <>
            <Source id="route" type="geojson" data={route}>
              <Layer
                id="route-line"
                type="line"
                paint={{
                  "line-color": "#ff5733",
                  "line-width": 4,
                }}
              />
            </Source>

            {/* Start Marker (circle) */}
            {start && (
              <Marker longitude={start[0]} latitude={start[1]}>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: "#00FF7F",
                    borderRadius: "50%",
                    border: "2px solid white",
                    boxShadow: "0 0 3px rgba(0,0,0,0.5)",
                  }}
                />
              </Marker>
            )}

            {/* End Marker (pin) */}
            {end && (
              <Marker longitude={end[0]} latitude={end[1]} anchor="bottom">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="#FF4136"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>
              </Marker>
            )}
          </>
        )}
      </Map>
    </div>
  );
}
