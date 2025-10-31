import { useState, useEffect } from "react";
import SmakButton from "../../components/SmakButton";
import CarCard from "./CarCard";
import ProfileCard from "./ProfileCard";
import CarModal from "./CarModal";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import UserModal from "./UserModal";
import type User from "../../interfaces/User";
import { uploadMedia } from "../../components/fileUpload/MediaUploader";
import useProfileImage from "../../hooks/useProfileImage";
import type Car from "../../interfaces/Cars";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user, refreshUser } = useAuth();
  const { profileImage, refreshProfileImage } = useProfileImage(
    user?.id || null
  );

  const preferences = ["Rökfri", "Inga pälsdjur", "Gillar musik", "Pratglad"];

  const isOwnProfile = !userId;

  const isAlreadyFriend = false;

  const [cars, setCars] = useState<Car[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userPayload, setUserPayload] = useState<{ user: User } | null>(null);
  const [showCarModal, setShowCarModal] = useState(false);
  const [carPayload, setCarPayload] = useState({
    id: "",
    brand: "",
    model: "",
    color: "",
    licensePlate: "",
    seats: 0,
  });

  useEffect(() => {
    if (!user?.id) return;

    async function fetchCars() {
      try {

        const response = await fetch(`/api/Car`);
        if (!response.ok) throw new Error('Failed to fetch cars');
        const allCars = await response.json();
        console.log('ALL cars:', allCars);
        console.log('User ID to match:', user!.id);
        const userCars = allCars
          .filter((car: any) => car.userId === user!.id)
          .map((car: any) => ({
            id: car.id || '',
            brand: car.brand || '',
            model: car.model || '',
            color: car.color || '',
            licensePlate: car.licensePlate || '',
            seats: typeof car.seats === 'number' ? car.seats : parseInt(car.seats) || 0,
            userId: car.userId
          }));
        console.log('Filtered user cars:', userCars);

        setCars(userCars);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    }

    fetchCars();
  }, [user]);

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

  const [isEdit, setIsEdit] = useState(false);

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

  async function handleSaveUser(updatedUser: User, profileFile?: File | null) {
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

        if (profileFile) {
          console.log("Uploading profile image file:", profileFile);
          await uploadMedia(profileFile);
          refreshProfileImage();
        }

        await refreshUser();

        setUserPayload({ user: savedUser });
        setShowUserModal(false);
      } catch (error) {
        console.error("Error saving user:", error);
      }
    }
  }

  // Car stuff

  function handleAddCar() {
    setCarPayload({ id: "", brand: "", model: "", color: "", licensePlate: "", seats: 0 });
    setIsEdit(false);
    setShowCarModal(true);
  }

  function handleEditCar(car: Car) {
    setCarPayload({
      id: car.id,
      brand: car.brand,
      model: car.model,
      color: car.color,
      licensePlate: car.licensePlate,
      seats: car.seats,
    });
    setIsEdit(true);
    setShowCarModal(true);
  }

  function handleCloseModal() {
    setShowCarModal(false);
    setCarPayload({ id: "", brand: "", model: "", color: "", licensePlate: "", seats: 0 });
  }

  async function handleSaveCar(car: typeof carPayload) {
    console.log("Saving car payload:", car);

    if (!user?.id) {
      console.error("Cannot save car: user ID is missing");
      return;
    }

    const isCreating = !isEdit;

    const payload = {
      brand: car.brand,
      model: car.model,
      color: car.color,
      licensePlate: car.licensePlate,
      seats: Number(car.seats),
      userId: user.id,
    };

    console.log("Payload being sent to API:", payload);

    const url = isCreating ? '/api/Car' : `/api/Car/${car.id}`;

    try {
      const response = await fetch(url, {
        method: isCreating ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to save car: ${errText}`);
      }

      const allCarsResponse = await fetch(`/api/Car`);
      const allCars = await allCarsResponse.json();
      const updatedCars = allCars
        .filter((car: any) => car.userId === user.id)
        .map((car: any) => ({
          id: car.id || '',
          brand: car.brand || '',
          model: car.model || '',
          color: car.color || '',
          licensePlate: car.licensePlate || '',
          seats: typeof car.seats === 'number' ? car.seats : parseInt(car.seats) || 0,
          userId: car.userId
        }));
      console.log('Updated cars after save:', updatedCars);
      setCars(updatedCars);
      handleCloseModal();
    } catch (error) {
      console.error('Error saving car:', error);
    }
  }

  async function handleDeleteCar(car: typeof carPayload) {
    try {
      const deleteResponse = await fetch(`/api/Car/${car.id}`, { method: 'DELETE' });
      if (!deleteResponse.ok) throw new Error('Failed to delete car');

      const allCarsResponse = await fetch(`/api/Car`);
      const allCars = await allCarsResponse.json();
      const updatedCars = allCars
        .filter((c: any) => c.userId === user?.id)
        .map((car: any) => ({
          id: car.id || '',
          brand: car.brand || '',
          model: car.model || '',
          color: car.color || '',
          licensePlate: car.licensePlate || '',
          seats: typeof car.seats === 'number' ? car.seats : parseInt(car.seats) || 0,
          userId: car.userId
        }));
      setCars(updatedCars);
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  }

  return (
    <>
      {user! && (
        <ProfileCard
          user={user!}
          profileImage={profileImage}
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

        {cars.length === 0 ? (
          <p className="text-muted">Inga fordon tillagda</p>
        ) : (
          cars.map((car) => (
            <CarCard key={car.id} car={car} isOwnProfile={isOwnProfile} onEdit={() => handleEditCar(car)} />
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
          onSave={() => handleSaveCar(carPayload)}
          onDelete={() => handleDeleteCar(carPayload)}
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
