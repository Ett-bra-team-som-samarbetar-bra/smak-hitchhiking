import React from "react";
import TripCardBig from "./trip/TripCardBig";
import TripCardSmall from "./trip/TripCardSmall";
import type Trip from "../interfaces/Trips";

interface TripGroupListProps {
  groupedTrips: Record<string, Trip[]>;
  isBooked?: boolean;
}

export function TripGroupList({
  groupedTrips,
  isBooked = false,
}: TripGroupListProps) {
  const [selectedIndex, setSelectedIndex] = React.useState<string | null>(null);

  const hasTrips = Object.keys(groupedTrips).length > 0;

  const toggleCard = (index: string) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <div className="d-flex flex-column gap-4">
      {hasTrips ? (
        Object.entries(groupedTrips).map(([date, trips]) => (
          <div key={date} className="d-flex flex-column gap-3">
            <h3 className="m-0">{new Date(date).toLocaleDateString("sv-SE")}</h3>
            {trips.map((trip) => {
              const cardKey = `${date}-${trip.id}`;
              const isSelected = selectedIndex === cardKey;

              return isSelected ? (
                <TripCardBig
                  key={cardKey}
                  trip={trip}
                  onBigTripCardClick={() => toggleCard(cardKey)}
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
        <h3 className="text-center m-0">Inga resor hittades</h3>
      )}
    </div>
  );
}
