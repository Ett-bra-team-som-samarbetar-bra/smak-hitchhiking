import { useEffect, useState } from "react";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function StaticMap() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchMap = async () => {
      const geojson = {
        type: "Feature",
        properties: {
          stroke: "#ff0000",
          "stroke-width": 4,
          "stroke-opacity": 0.8,
        },
        geometry: {
          type: "LineString",
          coordinates: [
            [18.0686, 59.3293],
            [15.6214, 58.4109],
          ],
        },
      };

      const encoded = encodeURIComponent(JSON.stringify(geojson));

      const res = await fetch(
        `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/geojson(${encoded})/auto/600x400?padding=100&access_token=${MAPBOX_TOKEN}`
      );
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    };

    fetchMap();

    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, []);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Static Map" className=""></img>
      ) : (
        <p> loading.....</p>
      )}
    </div>
  );
}
