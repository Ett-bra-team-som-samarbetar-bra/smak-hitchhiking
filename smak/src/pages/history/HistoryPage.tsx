import { groupTripsByDate } from "../../utils/DateUtils";
import { TripGroupList } from "../../components/TripListRender";
import { useTripCount } from "../../context/TripCountProvider";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import useAllTrips from "../../hooks/useAllTrips";
import useUserTrips from "../../hooks/useUserTrips";

export default function HistoryPage() {
  const { setHistoryCount } = useTripCount();
  const { user } = useAuth();

  if (!user) return null;
  const allTrips = useAllTrips();
  const filteredTrips = useUserTrips(user?.id, allTrips);

  const sortedTrips = filteredTrips.sort(
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
  }, [pastTrips.length, setHistoryCount]);

  return <TripGroupList groupedTrips={groupedPastTrips} isBooked={true} />;
}
