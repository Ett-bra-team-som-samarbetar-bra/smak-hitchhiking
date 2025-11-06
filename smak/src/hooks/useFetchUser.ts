import { useState, useEffect } from "react";
import type User from "../interfaces/User";

export default function useFetchUser(userId: string) {
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);

  useEffect(() => {
    if (!userId) {
      setFetchedUser(null);
      return;
    }

    const getUser = async () => {
      try {
        const response = await fetch(`/api/auth/user/${userId}`);
        if (!response.ok) throw new Error("Kunde ej hitta användare");
        const data = await response.json();
        setFetchedUser(data);
      } catch (error) {
        console.log("Kunde ej hitta användare", error);
        setFetchedUser(null);
      }
    };

    getUser();
  }, [userId]);

  return fetchedUser;
}
