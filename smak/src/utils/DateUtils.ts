import type Trip from "../interfaces/Trips";

// group trips by matching dates for printing out same day trips together
export function groupTripsByDate(trips: Trip[]) {
  const groupedTrips: Record<string, Trip[]> = {};
  for (const trip of trips) {
    const departure = new Date(trip.departureTime);

    // Use local date (Swedish locale-friendly)
    const localDate = departure.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    if (!groupedTrips[localDate]) {
      groupedTrips[localDate] = [];
    }
    groupedTrips[localDate].push(trip);
  }

  return groupedTrips;
}

// get trip date with time included
export function getTripDateTime(trip: Trip): Date {
  return new Date(trip.departureTime);
}

// generate some mock trips data
export function formatDate(daysFromNow: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split("T")[0];
}

export function getTripDateAndTime(trip: Trip) {
  const departure = new Date(trip.departureTime);
  const arrival = new Date(trip.arrivalTime);

  const date = departure.toISOString().split("T")[0];
  const startTime = departure.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = arrival.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { date, startTime, endTime };
}
