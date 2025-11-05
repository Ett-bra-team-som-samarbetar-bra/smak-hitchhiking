import { getTripDateTime, groupTripsByDate } from "../../utils/DateUtils";

import { TripGroupList } from "../../components/TripListRender";
import useAllTrips from "../../hooks/useAllTrips";

export default function TripsFoundPage() {
  const allTrips = useAllTrips();
  const sortedTrips = [...allTrips].sort(
    (a, b) =>
      new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
  );

  const today = new Date();
  const twoDaysLater = new Date();
  twoDaysLater.setDate(today.getDate() + 1);

  const upcomingTrips = sortedTrips.filter((trip) => {
    const tripDate = getTripDateTime(trip);
    return tripDate >= today && tripDate <= twoDaysLater;
  });

  const groupedUpcomingTrips = groupTripsByDate(upcomingTrips);

  return <TripGroupList groupedTrips={groupedUpcomingTrips} isBooked={false} />;
}
