import { useEffect, useState } from "react";
import type User from "../interfaces/User";
import type UserTrip from "../interfaces/UserTrips";

export default function useFetchPassengers(tripId: string) {
  const [passengers, setPassengers] = useState<User[]>([]);

  useEffect(() => {
    if (!tripId) {
      setPassengers([]);
      return;
    }

    async function getPassengers() {
      try {

        const result = await fetch("/api/TripUsers");
        if (!result.ok) throw new Error("Fel vid hämtande av resor");
        const tripUsers: UserTrip[] = await result.json();

        const userResult = await fetch("/api/auth/user?pageSize=99");
        if (!userResult.ok) throw new Error("Fel vid hämtande av användare");
        const userData = await userResult.json();
        const users: User[] = userData.users;


        // Filter TripUsers for this trip
        const matchingTripUsers = tripUsers.filter(
          (tu) => tu?.tripId?.trim() === tripId.trim()
        );

        // Extract passenger IDs
        const passengerIds = matchingTripUsers
          .flatMap((tu) => tu.user?.map((u) => u.id) ?? [])
          .filter(Boolean);

        const filteredUsers = users.filter((u) => passengerIds.includes(u.id));

        setPassengers(filteredUsers);
      } catch (error) {
        console.error("Fel vid hämtande av resor", error);
        setPassengers([]);
      }
    }

    getPassengers();
  }, [tripId]);

  return passengers;
}
