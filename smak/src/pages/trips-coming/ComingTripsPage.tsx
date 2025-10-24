import { getAllTrips, getTripDateTime, groupTripsByDate } from "../../utils/DateUtils";
import { TripGroupList } from "../../components/TripListRender";

export default function ComingTripsPage() {

  const allTrips = getAllTrips();

  const sortedTrips = [...allTrips].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const today = new Date();
  const upcomingTrips = sortedTrips.filter(trip => getTripDateTime(trip) > today);

  const groupedUpcomingTrips = groupTripsByDate(upcomingTrips);

  return (
    <TripGroupList groupedTrips={groupedUpcomingTrips} />
  );
}
