import type Trip from "../interfaces/Trips";

export default interface TripCardProps {
  trip: Trip;
  className?: string;
  cardButtonType?:
    | "userBook"
    | "userCancel"
    | "driverStart"
    | "driverDone"
    | "none";
  onSmallTripCardClick?: () => void;
  onBigTripCardClick?: () => void;
  onUserClick?: () => void;
  onCarClick?: () => void;
  onButtonClick?: () => void;
  onTripCancelled?: (tripId: string) => void;
  isBooked?: boolean;
}
