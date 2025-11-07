import { useSearchParams } from "react-router-dom";
import { getTripDateTime, groupTripsByDate } from "../../utils/DateUtils";

import { TripGroupList } from "../../components/TripListRender";
import useAllTrips from "../../hooks/useAllTrips";

export default function TripsFoundPage() {
  const [params] = useSearchParams();
  const dateParam = params.get("date");
  const from = params.get("from");
  const date = dateParam ? new Date(dateParam) : null;
  const allTrips = useAllTrips();

  if (!from || !date || isNaN(date.getTime())) {
    return <p>Inga resor fanns tillgängliga</p>;
  }

  const twoDaysLater = new Date(date);
  twoDaysLater.setDate(date.getDate() + 1);

  const upcomingTrips = allTrips
    .filter((trip) => {
      const tripDate = getTripDateTime(trip);
      return tripDate >= date && tripDate <= twoDaysLater;
    })
    .sort(
      (a, b) =>
        new Date(a.departureTime).getTime() -
        new Date(b.departureTime).getTime()
    );

  const groupedUpcomingTrips = groupTripsByDate(upcomingTrips);

  return <TripGroupList groupedTrips={groupedUpcomingTrips} isBooked={false} cardButtonType="userBook" />;
}
