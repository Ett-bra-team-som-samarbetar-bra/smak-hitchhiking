import { useState } from "react";
import SmakButton from "../../components/SmakButton";
import CarCard from "./CarCard";
import ProfileCard from "./ProfileCard";
import CarModal from "./CarModal";
import { useLocation, useParams } from "react-router-dom";
import { getMockUser, getMockCars } from "../../utils/MockData";

export default function ProfilePage() {
  const { userId } = useParams();
  const location = useLocation();
  const passedUser = location.state?.user;

  const isOwnProfile = !userId;

  const displayUser = passedUser ? {
    ...passedUser,
  } : getMockUser();

  const isAlreadyFriend = false;

  const [showCarModal, setShowCarModal] = useState(false);
  const [carPayload, setCarPayload] = useState({ brand: "", model: "", color: "", licensePlate: "", seats: 0 });
  const [isEdit, setIsEdit] = useState(false);

  function handleAddCar() {
    setCarPayload({ brand: "", model: "", color: "", licensePlate: "", seats: 0 });
    setIsEdit(false);
    setShowCarModal(true);
  }

  function handleEditCar(car: { brand: string; model: string; color: string; licensePlate: string; seats: number }) {
    setCarPayload(car);
    setIsEdit(true);
    setShowCarModal(true);
  }

  function handleCloseModal() {
    setShowCarModal(false);
    setCarPayload({ brand: "", model: "", color: "", licensePlate: "", seats: 0 });
  }

  return (
    <>
      <ProfileCard user={displayUser} isOwnProfile={isOwnProfile} isAlreadyFriend={isAlreadyFriend} />
      <div className="d-flex flex-column gap-3">
        <h2 className="m-0">Fordon</h2>

        {getMockCars().length === 0 ? (
          <p className="text-muted">Inga fordon tillagda</p>
        ) : (
          getMockCars().map((car, index) => (
            <CarCard
              key={index}
              car={car}
              isOwnProfile={isOwnProfile}
              onEdit={() => handleEditCar({ brand: car.brand, model: car.model, color: car.color, licensePlate: car.licensePlate, seats: car.seats })}
            />
          ))
        )}
        <CarModal
          show={showCarModal}
          onClose={handleCloseModal}
          payload={carPayload}
          setPayload={setCarPayload}
          isEdit={isEdit}
          isOwnProfile={isOwnProfile}
        />
        {isOwnProfile && <SmakButton className="my-2" onClick={handleAddCar}>
          Lägg till fordon
        </SmakButton>

        }
      </div>
    </>
  );
}
