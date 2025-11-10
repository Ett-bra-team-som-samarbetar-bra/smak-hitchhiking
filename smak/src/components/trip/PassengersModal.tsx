import SmakModal from "../SmakModal";
import type User from "../../interfaces/User";
import DividerLine from "../DividerLine";

interface PassengersModalProps {
  show: boolean;
  onClose: () => void;
  passengers: User[];
  title?: string;
  onUserClick: (passenger: User) => void;
}

export default function PassengersModal({
  show,
  onClose,
  passengers,
  title = "Passagerare",
  onUserClick,
}: PassengersModalProps) {
  return (
    <SmakModal show={show} onClose={onClose} title={title}>
      {passengers.length === 0 ? (
        <p className="text-muted text-center">Inga passagerare än</p>
      ) : (
        <div className="d-flex flex-column">
          {passengers.map((passenger) => (
            <div 
            key={passenger.id} 
            className="px-3 bg-light cursor-pointer" 
            onClick={() => onUserClick(passenger)}>
              <h6 className="mb-1 text-primary fw-bold">
              {passenger.firstName} {passenger.lastName}
              </h6>

              <div className="d-flex align-items-center">
                <span className="small">{passenger.phoneNumber}</span>
              </div>

              {
                passenger !== passengers[passengers.length - 1] &&
                <DividerLine className="my-3" variant="secondary" />}
            </div>
          ))}
        </div>
      )}
    </SmakModal>
  );
}
