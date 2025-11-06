import { useState, useEffect } from "react";

export default function useProfileImage(userId: string | null) {
  const [profileImage, setProfileImage] = useState<string>(
    "/images/user-placeholder.jpg"
  );

  const refreshProfileImage = () => {
    if (!userId) return;
    setProfileImage(`/media/_Users/${userId}/${userId}?v=${Date.now()}`);
  };

  useEffect(() => {
    if (!userId) {
      setProfileImage("/images/user-placeholder.jpg");
    }

    const fetchProfileImage = async () => {
      try {
        const res = await fetch(`/media/_Users/${userId}/${userId}`, {
          method: "HEAD",
        });
        if (res.ok) {
          setProfileImage(`/media/_Users/${userId}/${userId}`);
        } else {
          setProfileImage(`/images/user-placeholder.jpg`);
        }
      } catch (err) {
        setProfileImage(`/images/user-placeholder.jpg`);
      }
    };

    fetchProfileImage();
  }, [userId]);
  return { profileImage, refreshProfileImage };
}
