import { useEffect, useState } from "react";
import type User from "../interfaces/User";
import type UserTrip from "../interfaces/UserTrips";

export default function useFetchPassengers(tripId: string) {
  const [passengers, setPassengers] = useState<User[]>([]);

  useEffect(() => {
    async function getPassengers() {
      try {
        const result = await fetch("api/TripUsers");
        if (!result.ok) throw new Error("Fel vid hämtande av resor");
        const data: UserTrip[] = await result.json();

        const userResult = await fetch("api/auth/user");
        if (!userResult.ok) throw new Error("Fel vid hämtande av användare");
        const userData: User[] = await userResult.json();

        const userTripIds = data
          .filter((tu) => tu?.tripId === tripId)
          .map((tu) => tu?.user[0].id)
          .filter(Boolean);

        const filteredUsers = userData.filter((user: User) =>
          userTripIds.includes(user?.id)
        );

        setPassengers(filteredUsers);
        console.log(filteredUsers);
      } catch (error) {
        console.log("Fel vid hämtande av resor", error);
        setPassengers([]);
      }
    }

    getPassengers();
  }, [tripId]);
  return passengers;
}
