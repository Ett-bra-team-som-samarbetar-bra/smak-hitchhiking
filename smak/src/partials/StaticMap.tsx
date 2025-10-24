import { useEffect, useState } from "react";
import useCoordinates from "../hooks/useCoordinates";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface StaticMapProps {
  from: string;
  to: string;
}

export default function StaticMap({ from, to }: StaticMapProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fromCoords = useCoordinates(from);
  const toCoords = useCoordinates(to);

  useEffect(() => {
    if (!fromCoords || !toCoords) return;
    const fetchMap = async () => {
      const resMap = await fetch(
        `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+016d85(${fromCoords}),pin-s+016d85(${toCoords})/auto/600x300?padding=100&access_token=${MAPBOX_TOKEN}`
      );
      const blob = await resMap.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    };

    fetchMap();

    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [fromCoords, toCoords]);

  return (
    <>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Static Map"
          className="w-100 trip-card-map-image rounded-2"
        ></img>
      ) : (
        <p> loading.....</p>
      )}
    </>
  );
}
