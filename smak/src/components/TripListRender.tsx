import React from "react";
import TripCardBig from "./trip/TripCardBig";
import TripCardSmall from "./trip/TripCardSmall";
import type Trip from "../interfaces/Trips";

interface TripGroupListProps {
  groupedTrips: Record<string, Trip[]>;
}

export function TripGroupList({ groupedTrips }: TripGroupListProps) {
  const [selectedIndex, setSelectedIndex] = React.useState<string | null>(null);

  const toggleCard = (index: string) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <div className="d-flex flex-column gap-4">
      {Object.entries(groupedTrips).map(([date, trips]) => (
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
              />
            ) : (
              <TripCardSmall
                key={cardKey}
                trip={trip}
                onSmallTripCardClick={() => toggleCard(cardKey)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
