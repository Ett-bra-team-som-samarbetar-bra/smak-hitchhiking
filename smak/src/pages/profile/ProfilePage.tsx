import { useState, useEffect } from "react";
import SmakButton from "../../components/SmakButton";
import CarCard from "./CarCard";
import ProfileCard from "./ProfileCard";
import CarModal from "./CarModal";
import { useParams } from "react-router-dom";
import { getMockCars } from "../../utils/MockData";
import { useAuth } from "../../hooks/useAuth";
import UserModal from "./UserModal";
import type User from "../../interfaces/User";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user, refreshUser } = useAuth();

  const preferences = ["Rökfri", "Inga pälsdjur", "Gillar musik", "Pratglad"];

  const isOwnProfile = !userId;

  const isAlreadyFriend = false;

  const [showUserModal, setShowUserModal] = useState(false);
  const [userPayload, setUserPayload] = useState<{ user: User } | null>(null);
  useEffect(() => {
    if (user) {
      setUserPayload({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          description: user.description,
          rating: user.rating,
          tripCount: user.tripCount,
          preferences: user.preferences,
        },
      });
    }
  }, [user]);

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

  function handleEditUser(user: Partial<User>) {
    setUserPayload({
      user: {
        id: user.id || "",
        username: user.username || "",
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        description: user.description || "",
        rating: user.rating ?? 0,
        tripCount: user.tripCount ?? 0,
        preferences: preferences || [],
      },
    });
    setIsEdit(true);
    setShowUserModal(true);
  }

  function handleCloseUserModal() {
    setShowUserModal(false);
    setUserPayload({
      user: {
        id: "",
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        description: "",
        rating: 0,
        tripCount: 0,
        preferences: [],
      },
    });
  }

  async function handleSaveUser(updatedUser: User) {
    {
      console.log("Saving user:", updatedUser);

      const payloadToSend = {
        username: updatedUser.username,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phoneNumber: updatedUser.phoneNumber,
        description: updatedUser.description,
        preferences: updatedUser.preferences,
      };

      try {
        const response = await fetch(`api/auth/login`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payloadToSend),
        });

        if (!response.ok) {
          throw new Error("Failed to save user");
        }

        const savedUser = await response.json();
        console.log("User saved successfully:", savedUser);

        await refreshUser();

        setUserPayload({ user: savedUser });
        setShowUserModal(false);
      } catch (error) {
        console.error("Error saving user:", error);
      }
    }
  }

  return (
    <>
      {user! && (
        <ProfileCard
          user={user!}
          profileImage={"hej"}
          isOwnProfile={isOwnProfile}
          isAlreadyFriend={isAlreadyFriend}
          onEdit={() =>
            handleEditUser({
              id: user?.id,
              username: user?.username,
              email: user?.email,
              firstName: user?.firstName,
              lastName: user?.lastName,
              phoneNumber: user?.phoneNumber,
              description: user?.description,
              rating: user?.rating,
              tripCount: user?.tripCount,
              preferences: preferences,
            })
          }
        />
      )}
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
        {userPayload && (
          <UserModal
            show={showUserModal}
            onClose={handleCloseUserModal}
            payload={userPayload}
            setPayload={setUserPayload}
            isEdit={isEdit}
            isOwnProfile={isOwnProfile}
            onSave={handleSaveUser}
          />
        )}
        <CarModal
          title={isEdit ? "Redigera fordon" : "Lägg till fordon"}
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
