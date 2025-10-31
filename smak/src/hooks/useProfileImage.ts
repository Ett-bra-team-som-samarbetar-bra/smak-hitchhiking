import { useState, useEffect } from "react";

export default function useProfileImage(userId: string | null) {
  const [profileImage, setProfileImage] =
    useState<string>("/images/harold.png");

  const refreshProfileImage = () => {
    if (userId) {
      setProfileImage(`/media/${userId}?v=${Date.now()}`);
    }
  };

  useEffect(() => {
    if (userId) {
      const fetchProfileImage = async () => {
        try {
          const res = await fetch(`/media/${userId}`, { method: "HEAD" });
          if (res.ok) {
            setProfileImage(`/media/${userId}`);
          } else {
            setProfileImage(`/images/harold.png`);
          }
        } catch (err) {
          console.error("Error fetching profile image:", err);
          setProfileImage(`/images/harold.png`);
        }
      };

      fetchProfileImage();
    }
  }, [userId]);
  return { profileImage, refreshProfileImage };
}
