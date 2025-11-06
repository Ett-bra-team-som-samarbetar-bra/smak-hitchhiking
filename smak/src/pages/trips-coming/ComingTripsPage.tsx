import { getTripDateTime, groupTripsByDate } from "../../utils/DateUtils";
import { TripGroupList } from "../../components/TripListRender";
import { useTripCount } from "../../context/TripCountProvider";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import useAllTrips from "../../hooks/useAllTrips";
import useUserTrips from "../../hooks/useUserTrips";

export default function ComingTripsPage() {
  const { setComingCount } = useTripCount();
  const allTrips = useAllTrips();
  const { user } = useAuth();

  if (!user) return null;
  const userTrips = useUserTrips(user?.id, allTrips);

  const sortedTrips = [...userTrips].sort(
    (a, b) =>
      new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
  );
  const today = new Date();
  const upcomingTrips = sortedTrips.filter(
    (trip) => getTripDateTime(trip) > today
  );
  const groupedUpcomingTrips = groupTripsByDate(upcomingTrips);

  useEffect(() => {
    setComingCount(upcomingTrips.length);
  }, [upcomingTrips]);

  return <TripGroupList groupedTrips={groupedUpcomingTrips} isBooked={true} />;
}
