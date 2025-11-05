import { useState, useEffect } from "react";
import type Trip from "../interfaces/Trips";

export default function useAllTrips() {
  const [allTrips, setAllTrips] = useState<Trip[]>([]);

  useEffect(() => {
    async function getAllTrips() {
      try {
        const result = await fetch("api/Trip");
        if (!result.ok) throw new Error("Fel vid hämtande av resor");
        const data: Trip[] = await result.json();

        const trips: Trip[] = data.map((trip: any) => ({
          ...trip,
          departureTime: new Date(trip.departureTime),
        }));
        setAllTrips(trips);
      } catch (error) {
        console.log("Fel vid hämtande av resor", error);
      }
    }

    getAllTrips();
  }, []);
  return allTrips;
}
