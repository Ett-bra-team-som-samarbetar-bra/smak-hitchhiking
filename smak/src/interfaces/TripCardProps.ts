export default interface TripCardProps {
  firstName?: string;
  lastName?: string;
  startCity?: string;
  endCity?: string;
  startTime?: string;
  endTime?: string;
  rating?: number;
  distance?: number;
  date?: string;
  profileImage?: string;
  vehicleInfo?: string;
  numOfSeats?: string;
  className?: string;
  cardButtonType?: "book" | "cancel" | "none";
  onSmallTripCardClick?: () => void;
  onUserClick?: () => void;
  onCarClick?: () => void;
  onButtonClick?: () => void;
}
