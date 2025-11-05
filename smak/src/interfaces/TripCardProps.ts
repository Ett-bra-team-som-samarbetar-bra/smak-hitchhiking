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
  cardButtonType?: "userBook" | "userCancel" | "driverStart" | "driverDone" | "none";
  onSmallTripCardClick?: () => void;
  onBigTripCardClick?: () => void;
  onUserClick?: () => void;
  onCarClick?: () => void;
  onButtonClick?: () => void;
}
