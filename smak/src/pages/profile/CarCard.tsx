import SmakCard from "../../components/SmakCard";
import IconButton from "../../components/IconButton";

interface CarCardProps {
  car: { model: string; licensePlate: string; seats: number; brand: string; color: string; };
  isOwnProfile?: boolean;
  onEdit?: () => void;
}

export default function CarCard({
  car,
  isOwnProfile = true,
  onEdit
}: CarCardProps) {
  const seatsLabel = car.seats > 1 ? "platser" : "plats";

  return (
    <SmakCard>
      <div className="d-flex justify-content-between gap-3 align-items-center">
        <div className="d-flex align-items-center gap-3">
          <i className="bi bi-car-front-fill fs-1 text-black"></i>
          <div className="d-flex flex-column align-items-start">
            <p className="m-0 fs-5 text-black">{car.brand} {car.model}</p>
            <p className="m-0 text-black-50 small">{car.licensePlate} - {car.seats} {seatsLabel}</p>
          </div>
        </div>

        <IconButton
          icon={isOwnProfile ? "bi-pencil-fill" : "bi-info-circle"}
          onClick={onEdit}
          variant="flat"
          className="p-2"
        />
      </div>
    </SmakCard>
  );
}
