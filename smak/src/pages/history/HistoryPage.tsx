
import { getTripDateTime, groupTripsByDate } from "../../utils/DateUtils";
import { getAllTrips } from "../../utils/MockData";
import { TripGroupList } from "../../components/TripListRender";
import { useTripCount } from "../../context/TripCountProvider";
import { useEffect } from "react";

export default function HistoryPage() {
  const { setHistoryCount } = useTripCount();

  const allTrips = getAllTrips();
  const sortedTrips = [...allTrips].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const today = new Date();
  const pastTrips = sortedTrips.filter(trip => getTripDateTime(trip, true) < today);
  const groupedPastTrips = groupTripsByDate(pastTrips);

  useEffect(() => {
    setHistoryCount(pastTrips.length);
  }, [pastTrips]);

  return (
    <TripGroupList groupedTrips={groupedPastTrips} />
  );
}
