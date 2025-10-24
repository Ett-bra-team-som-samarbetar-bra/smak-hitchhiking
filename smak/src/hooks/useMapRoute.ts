import { useState, useEffect } from "react";

interface RouteData {
  coordinates: number[][];
  distance: number;
  duration: number;
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function useMapRoute(
  from: [number, number] | null,
  to: [number, number] | null
) {
  const [route, setRoute] = useState<RouteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!from || !to) return;

    const fetchRoute = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${from[0]},${from[1]};${to[0]},${to[1]}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`
        );

        if (!res.ok) throw new Error("Failed to fetch route");
        const data = await res.json();

        const routeData = {
          coordinates: data.routes?.[0]?.geometry?.coordinates ?? [],
          distance: data.routes?.[0]?.distance ?? 0,
          duration: data.routes?.[0]?.duration ?? 0,
        };

        setRoute(routeData);
      } catch (err: any) {
        setError(err.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [from, to]);

  return { route, loading, error };
}
