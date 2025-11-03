import { getTripDateTime, groupTripsByDate } from "../../utils/DateUtils";
import { getAllTrips } from "../../utils/MockData";
import { TripGroupList } from "../../components/TripListRender";
import { useTripCount } from "../../context/TripCountProvider";
import { useEffect } from "react";

export default function ComingTripsPage() {
  const { setComingCount } = useTripCount();

  const allTrips = getAllTrips();
  const sortedTrips = [...allTrips].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const today = new Date();
  const upcomingTrips = sortedTrips.filter(trip => getTripDateTime(trip) > today);
  const groupedUpcomingTrips = groupTripsByDate(upcomingTrips);

  useEffect(() => {
    setComingCount(upcomingTrips.length);
  }, [upcomingTrips]);

  return (
    <TripGroupList groupedTrips={groupedUpcomingTrips} />
  );
}
