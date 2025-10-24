import { useEffect, useState } from "react";

export default function StaticMap() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchMap = async () => {
      const res = await fetch(
        `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/[-121.8742,37.6292,-121.462,37.8465]/300x200?access_token=pk.eyJ1Ijoic2FtYWttZWRzbWFrIiwiYSI6ImNtZ3lzc3YydDF2c2wyanI3MnozeHYwdXYifQ.7bzxGIbFwKO7Hc7_I1fnLw`
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
