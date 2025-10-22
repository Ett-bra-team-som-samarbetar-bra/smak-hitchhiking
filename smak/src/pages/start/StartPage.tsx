import { useEffect, useRef, useState } from "react"
import Map, { Source, Layer, Marker, type MapRef } from "react-map-gl/mapbox"
import "mapbox-gl/dist/mapbox-gl.css"

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function StartPage() {
  const [from, setFrom] = useState<string>()
  const [to, setTo] = useState<string>()
  const [route, setRoute] = useState<any>(null)
  const [start, setStart] = useState<number[] | null>(null)
  const [end, setEnd] = useState<number[] | null>(null)
  const mapRef = useRef<MapRef>(null)

  const fetchRoute = async (fromCity: string, toCity: string) => {
    try {
      const geocode = async (place: string) => {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            place)}
            .json?access_token=${MAPBOX_TOKEN}`
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

      const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${fromCoords[0]},${fromCoords[1]};${toCoords[0]},${toCoords[1]}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`;
      const res = await fetch(routeUrl);
      const data = await res.json();
      const newRoute = data.routes[0].geometry;
      setRoute(newRoute);

      const coords = newRoute.coordinates;
      const long = coords.map((C: number[]) => C[0]);
      const lats = coords.map((c: number[]) => c[1]);
      const bounds: [[number,  number], [number, number]] = [
        [Math.min(...long), Math.min(...lats)],
        [Math.max(...long), Math.max(...lats)
      ]
    ];
    mapRef.current?.fitBounds(bounds, { padding: 60, duration: 1500 });
    } catch (err) {
      console.error("Error fetching route:", err);
    }
  };

  useEffect(() => {
    if(from && to) {
      fetchRoute(from, to);
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(from && to) {
      fetchRoute(from, to);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column py-3 h-50">
      <h1>Start Page</h1>
      <form onSubmit={handleSubmit}>
        <input 
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="From"/>
        <input 
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To"/> 
        <button type="submit">Get Route</button>

      </form>
    </div>
  )
}
