import { useState } from "react";
import SmakButton from "../../components/SmakButton";
import CarCard from "./CarCard";
import ProfileCard from "./ProfileCard";
import CarModal from "./CarModal";
import { useLocation, useParams } from "react-router-dom";
import { getMockUser, getMockCars } from "../../utils/MockData";
import { useAuth } from "../../hooks/useAuth";
import UserModal from "./UserModal";

export default function ProfilePage() {
  const { userId } = useParams();
  const location = useLocation();
  const passedUser = location.state?.user;
  const { user } = useAuth();

  const preferences = ["Rökfri", "Inga pälsdjur", "Gillar musik", "Pratglad"];

  const isOwnProfile = !userId;

  const displayUser = passedUser
    ? {
        ...passedUser,
      }
    : getMockUser();

  const isAlreadyFriend = false;

  const [showUserModal, setShowUserModal] = useState(false);
  const [userPayload, setUserPayload] = useState({
    username: displayUser.username,
    email: displayUser.email,
    firstName: displayUser.firstName,
    lastName: displayUser.lastName,
    phone: displayUser.phone,
    description: displayUser.description,
    rating: displayUser.rating,
    tripCount: displayUser.tripCount,
    preferences: preferences,
  });

  const [showCarModal, setShowCarModal] = useState(false);
  const [carPayload, setCarPayload] = useState({
    brand: "",
    model: "",
    color: "",
    licensePlate: "",
    seats: 0,
  });
  const [isEdit, setIsEdit] = useState(false);

  function handleAddCar() {
    setCarPayload({
      brand: "",
      model: "",
      color: "",
      licensePlate: "",
      seats: 0,
    });
    setIsEdit(false);
    setShowCarModal(true);
  }

  function handleEditCar(car: {
    brand: string;
    model: string;
    color: string;
    licensePlate: string;
    seats: number;
  }) {
    setCarPayload(car);
    setIsEdit(true);
    setShowCarModal(true);
  }

  function handleCloseModal() {
    setShowCarModal(false);
    setCarPayload({
      brand: "",
      model: "",
      color: "",
      licensePlate: "",
      seats: 0,
    });
  }

  function handleEditUser(user: {
    username: string | undefined;
    email: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    phone: string | undefined;
    description: string | undefined;
    rating: number | undefined;
    tripCount: number | undefined;
    preferences: string[] | undefined;
  }) {
    setUserPayload({
      ...user,
      preferences: user.preferences ?? [],
    });
    setIsEdit(true);
    setShowUserModal(true);
  }

  function handleCloseUserModal() {
    setShowUserModal(false);
    setUserPayload({
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      description: "",
      rating: 0,
      tripCount: 0,
      preferences: [],
    });
  }

  return (
    <>
      <ProfileCard
        user={displayUser}
        isOwnProfile={isOwnProfile}
        isAlreadyFriend={isAlreadyFriend}
        onEdit={() =>
          handleEditUser({
            username: user?.username,
            email: user?.email,
            firstName: user?.firstName,
            lastName: user?.lastName,
            phone: user?.phone,
            description: user?.description,
            rating: user?.rating,
            tripCount: user?.tripCount,
            preferences: preferences,
          })
        }
      />
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
              onEdit={() =>
                handleEditCar({
                  brand: car.brand,
                  model: car.model,
                  color: car.color,
                  licensePlate: car.licensePlate,
                  seats: car.seats,
                })
              }
            />
          ))
        )}
        <UserModal
          show={showUserModal}
          onClose={handleCloseUserModal}
          payload={userPayload}
          setPayload={setUserPayload}
          isEdit={isEdit}
          isOwnProfile={isOwnProfile}
        />
        <CarModal
          show={showCarModal}
          onClose={handleCloseModal}
          payload={carPayload}
          setPayload={setCarPayload}
          isEdit={isEdit}
          isOwnProfile={isOwnProfile}
        />
        {isOwnProfile && (
          <SmakButton className="my-2" onClick={handleAddCar}>
            Lägg till fordon
          </SmakButton>
        )}
      </div>
    </>
  );
}
