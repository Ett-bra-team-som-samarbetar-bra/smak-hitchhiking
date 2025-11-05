import { useState, useEffect } from "react";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function useCoordinates(city: string) {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!city) return;
    const fetchCoordinates = async () => {
      try {
        const resFrom = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            city
          )}.json?access_token=${MAPBOX_TOKEN}`
        );
        const data = await resFrom.json();
        const coords = data.features?.[0]?.geometry.coordinates ?? null;
        setCoordinates(coords);
      } catch (err) {
        setCoordinates(null);
      }
    };

    fetchCoordinates();
  }, [city]);

  return coordinates;
}
