import { Button } from "react-bootstrap";
import "../../components/trip/TripCard.scss";

interface TripCardButtonProps {
  className?: string;
  onClick?: () => void;
  label: string;
  disabled: boolean;
}

export default function TripCardButton({
  className,
  onClick,
  label,
  disabled,
}: TripCardButtonProps) {
  return (
    <Button
      type="button"
      className={`btn btn-primary rounded-5 trip-card-button-width p-1 ${
        className || ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="fw-bold medium-font-size">{label}</span>
    </Button>
  );
}
