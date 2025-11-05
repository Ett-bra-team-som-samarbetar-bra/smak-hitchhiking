import { useEffect, useState } from "react";
import type Trip from "../interfaces/Trips";
import type UserTrip from "../interfaces/UserTrips";

export default function useUserTrips(userId: string, allTrips: Trip[]) {
  const [userTrips, setUserTrips] = useState<Trip[]>([]);

  useEffect(() => {
    if (!userId || !allTrips.length) return;

    async function getUserTrips() {
      try {
        const result = await fetch("api/TripUsers");
        if (!result.ok) throw new Error("Fel vid hämtande av resor");
        const data: UserTrip[] = await result.json();

        const userTripIds = data
          .filter((tu) => tu.userId[0].id === userId)
          .map((tu) => tu.tripIdId);

        const filteredTrips = allTrips.filter(
          (trip) =>
            trip.driverId[0].id === userId || userTripIds.includes(trip.id)
        );

        setUserTrips(filteredTrips);
      } catch (error) {
        console.log("Fel vid hämtande av resor", error);
      }
    }

    getUserTrips();
  }, [userId, allTrips]);
  return userTrips;
}
