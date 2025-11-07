import { useEffect, useState } from "react";
import TripCardBig from "./trip/TripCardBig";
import TripCardSmall from "./trip/TripCardSmall";
import type Trip from "../interfaces/Trips";

interface TripGroupListProps {
  groupedTrips: Record<string, Trip[]>;
  isBooked?: boolean;
  cardButtonType?:
    | "userBook"
    | "userCancel"
    | "driverStart"
    | "driverDone"
    | "none";
  onTripCancelled?: (tripId: string) => void;
}

export function TripGroupList({
  groupedTrips,
  isBooked = false,
  cardButtonType = "none",
  onTripCancelled,
}: TripGroupListProps) {
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 75);
    return () => clearTimeout(timer);
  }, [groupedTrips]);

  const handleTripCancelled = (tripId: string) => {
    onTripCancelled?.(tripId);
  };

  const hasTrips = Object.keys(groupedTrips).length > 0;

  const toggleCard = (index: string) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      setSelectedIndex(index);
    }
  };

  if (!ready) {
    return <div />;
  }

  return (
    <div className="d-flex flex-column gap-4">
      {hasTrips ? (
        Object.entries(groupedTrips).map(([date, trips]) => (
          <div key={date} className="d-flex flex-column gap-3">
            <h3 className="m-0">
              {new Date(date).toLocaleDateString("sv-SE")}
            </h3>
            {trips.map((trip) => {
              const cardKey = `${date}-${trip.id}`;
              const isSelected = selectedIndex === cardKey;

              return isSelected ? (
                <TripCardBig
                  key={cardKey}
                  trip={trip}
                  cardButtonType={cardButtonType}
                  onBigTripCardClick={() => toggleCard(cardKey)}
                  onTripCancelled={handleTripCancelled}
                  isBooked={isBooked}
                />
              ) : (
                <TripCardSmall
                  key={cardKey}
                  trip={trip}
                  onSmallTripCardClick={() => toggleCard(cardKey)}
                  isBooked={isBooked}
                />
              );
            })}
          </div>
        ))
      ) : (
        <h2 className="m-0">Inga resor hittades</h2>
      )}
    </div>
  );
}
