
import { getTripDateTime, groupTripsByDate } from "../../utils/DateUtils";
import { getAllTrips } from "../../utils/MockData";
import { TripGroupList } from "../../components/TripListRender";

export default function TripsFoundPage() {

  const allTrips = getAllTrips();
  const sortedTrips = [...allTrips].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const today = new Date();
  const twoDaysLater = new Date();
  twoDaysLater.setDate(today.getDate() + 1);

  const upcomingTrips = sortedTrips.filter(trip => {
    const tripDate = getTripDateTime(trip);
    return tripDate >= today && tripDate <= twoDaysLater;
  });

  const groupedUpcomingTrips = groupTripsByDate(upcomingTrips);

  return (
    <TripGroupList groupedTrips={groupedUpcomingTrips} />
  );
}
