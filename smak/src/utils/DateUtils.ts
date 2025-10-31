
interface TripType {
  date: string;
  [key: string]: any;
}

// group trips by matching dates for printing out same day trips together
export function groupTripsByDate(trips: TripType[]) {
  const groupedTrips: { [date: string]: TripType[] } = {};
  for (const trip of trips) {
    const date = trip.date;
    if (!groupedTrips[date]) {
      groupedTrips[date] = [];
    }
    groupedTrips[date].push(trip);
  }

  return groupedTrips;
}

// get trip date with time included
export function getTripDateTime(trip: TripType, useEndTime = false): Date {
  const timeString = useEndTime ? trip.endTime : trip.startTime;
  const [hours, minutes] = timeString.split(":").map(Number);

  const tripDateTime = new Date(trip.date);
  tripDateTime.setHours(hours, minutes, 0, 0);

  return tripDateTime;
}

// generate some mock trips data
export function formatDate(daysFromNow: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split("T")[0];
}
