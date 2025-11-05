import { groupTripsByDate } from "../../utils/DateUtils";
import { TripGroupList } from "../../components/TripListRender";
import { useTripCount } from "../../context/TripCountProvider";
import { useEffect } from "react";
import useAllTrips from "../../hooks/useAllTrips";

export default function HistoryPage() {
  const { setHistoryCount } = useTripCount();

  const allTrips = useAllTrips();
  const sortedTrips = [...allTrips].sort(
    (a, b) =>
      new Date(b.arrivalTime).getTime() - new Date(a.arrivalTime).getTime()
  );
  const pastTrips = sortedTrips.filter((trip) => {
    if (!trip.arrivalTime) return false;
    return new Date(trip.arrivalTime).getTime() < Date.now();
  });
  const groupedPastTrips = groupTripsByDate(pastTrips);

  useEffect(() => {
    setHistoryCount(pastTrips.length);
  }, [pastTrips]);

  return <TripGroupList groupedTrips={groupedPastTrips} isBooked={true} />;
}
