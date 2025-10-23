import { useState } from "react";
import SmakButton from "../../components/SmakButton";
import CarCard from "./CarCard";
import ProfileCard from "./ProfileCard";
import CarModal from "./CarModal";

export default function ProfilePage() {
  const mockUser = {
    firstName: "Harold",
    lastName: "H. Pain",
    profileImage: "/images/harold.png",
    trips: 40,
    rating: "5",
    activeYears: "1.4 ",
    preferences: ["Rökfri", "Inga pälsdjur", "Gillar musik", "Pratglad"],
  };

  const mockCars = [
    {
      brand: "Audi",
      model: "A3",
      licensePlate: "KEK 057",
      color: "vit",
      seats: 4,
    },
    {
      brand: "Volvo",
      model: "V60",
      licensePlate: "FBI 007",
      color: "svart",
      seats: 4,
    }
  ];

  const isOwnProfile = true;
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
      <ProfileCard user={mockUser} isOwnProfile={isOwnProfile} isAlreadyFriend={isAlreadyFriend} />
      <div className="d-flex flex-column gap-3">
        <h2 className="m-0">Fordon</h2>

        {mockCars.length === 0 ? (
          <p className="text-muted">Inga fordon tillagda</p>
        ) : (
          mockCars.map((car, index) => (
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
