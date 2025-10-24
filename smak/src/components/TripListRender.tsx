import TripCardSmall from "./trip/TripCardSmall";

// todo: real types etc
interface TripType {
  date: string;
  [key: string]: any;
}

interface TripGroupListProps {
  groupedTrips: { [date: string]: TripType[] };
}

export function TripGroupList({ groupedTrips }: TripGroupListProps) {
  return (
    <div className="d-flex flex-column gap-4">
      {Object.entries(groupedTrips).map(([date, trips]) => (
        <div key={date} className="d-flex flex-column gap-3">
          <h3 className="m-0">
            {new Date(date).toLocaleDateString("sv-SE")}
          </h3>
          {trips.map((trip, index) => (
            <TripCardSmall key={index} {...trip} />
          ))}
        </div>
      ))}
    </div>
  );
}
