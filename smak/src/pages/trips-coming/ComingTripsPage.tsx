import { getTripDateTime, groupTripsByDate } from "../../utils/DateUtils";
import { TripGroupList } from "../../components/TripListRender";
import { useTripCount } from "../../context/TripCountProvider";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAllTrips from "../../hooks/useAllTrips";
import useUserTrips from "../../hooks/useUserTrips";

export default function ComingTripsPage() {
  const { setComingCount } = useTripCount();
  const { user } = useAuth();

  if (!user) return null;

  const allTrips = useAllTrips();
  const userTrips = useUserTrips(user?.id, allTrips);

  // Local copy so we can remove items easily
  const [localTrips, setLocalTrips] = useState(userTrips);

  // Keep it in sync if userTrips updates (e.g. new fetch)
  useEffect(() => {
    setLocalTrips(userTrips);
  }, [userTrips]);

  // Filter and group
  const today = new Date();
  const upcomingTrips = localTrips
    .filter((trip) => getTripDateTime(trip) > today)
    .sort(
      (a, b) =>
        new Date(a.departureTime).getTime() -
        new Date(b.departureTime).getTime()
    );

  const groupedUpcomingTrips = groupTripsByDate(upcomingTrips);

  // Update counter
  useEffect(() => {
    setComingCount(upcomingTrips.length);
  }, [upcomingTrips]);

  // Callback that removes a trip
  const handleTripCancelled = (tripId: string) => {
    setLocalTrips((prev) => prev.filter((t) => t.id !== tripId));
  };

  return (
    <TripGroupList
      groupedTrips={groupedUpcomingTrips}
      isBooked={true}
      cardButtonType="userCancel"
      onTripCancelled={handleTripCancelled}
    />
  );
}
