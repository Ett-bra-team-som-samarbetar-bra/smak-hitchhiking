import type Trip from "../interfaces/Trips";

export default interface TripCardProps {
  trip: Trip;
  firstName?: string;
  lastName?: string;
  endTime?: string;
  rating?: number;
  distance?: number;
  profileImage?: string;
  vehicleInfo?: string;
  className?: string;
  cardButtonType?: "book" | "cancel" | "none";
  onSmallTripCardClick?: () => void;
  onBigTripCardClick?: () => void;
  onUserClick?: () => void;
  onCarClick?: () => void;
  onButtonClick?: () => void;
}
