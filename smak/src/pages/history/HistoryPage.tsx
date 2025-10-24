
import { getAllTrips, getTripDateTime, groupTripsByDate } from "../../utils/DateUtils";
import { TripGroupList } from "../../components/TripListRender";

export default function HistoryPage() {

  const allTrips = getAllTrips();

  const sortedTrips = [...allTrips].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const today = new Date();
  const pastTrips = sortedTrips.filter(trip => getTripDateTime(trip, true) < today);

  const groupedPastTrips = groupTripsByDate(pastTrips);

  return (
    <TripGroupList groupedTrips={groupedPastTrips} />
  );
}
