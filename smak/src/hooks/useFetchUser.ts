import { useState, useEffect } from "react";
import type User from "../interfaces/User";

export default function useFetchUser(userId: string) {
  const [fetchedUser, setFetchedUser] = useState<User>();

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(`/api/auth/user/${userId}`);
        const data = await response.json();
        setFetchedUser(data);
      } catch (error) {
        console.log("Kunde ej hitta användare", error);
      }
    }

    getUser();
  }, []);

  return fetchedUser;
}
