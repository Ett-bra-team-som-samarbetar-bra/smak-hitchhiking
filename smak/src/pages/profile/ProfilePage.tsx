import { useState, useEffect } from "react";
import SmakButton from "../../components/SmakButton";
import CarCard from "./CarCard";
import ProfileCard from "./ProfileCard";
import CarModal from "./CarModal";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { uploadMedia } from "../../components/fileUpload/MediaUploader";
import UserModal from "./UserModal";
import type User from "../../interfaces/User";
import useProfileImage from "../../hooks/useProfileImage";
import type Car from "../../interfaces/Cars";
import { useSmakTopAlert } from "../../context/SmakTopAlertProvider";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user, refreshUser, logout } = useAuth();
  const { showAlert } = useSmakTopAlert();
  const { profileImage, refreshProfileImage } = useProfileImage(
    userId || user?.id || null
  );

  const [isAlreadyFriend, setIsAlreadyFriend] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [profileUser, setProfileUser] = useState<User | null>(null);
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

  const navigate = useNavigate();
  const preferences = ["Rökfri", "Inga pälsdjur", "Gillar musik", "Pratglad"];
  const isOwnProfile = !userId;
  const isAdmin = user?.roles.includes("Administrator") || false;

  // Set the profile user based on whether it's own profile or someone else
  useEffect(() => {
    if (isOwnProfile && user) {
      setProfileUser(user);
    } else if (userId) {
      async function fetchUserById() {
        try {
          const response = await fetch(`/api/auth/user/${userId}`);
          if (!response.ok) throw new Error('Failed to fetch user');
          const fetchedUser = await response.json();
          setProfileUser(fetchedUser);
        } catch (error) {
        }
      }

      fetchUserById();
    }
  }, [userId, user, isOwnProfile]);

  // check if friend
  useEffect(() => {
    if (!user?.id || !profileUser?.id || isOwnProfile) return;

    async function checkFriendship() {
      try {
        const response = await fetch('/api/Contact');
        if (!response.ok) throw new Error('Failed to fetch contacts');
        const contacts = await response.json();

        const isFriend = contacts.some((contact: any) =>
          contact.user?.[0]?.id === user!.id &&
          contact.contact?.[0]?.id === profileUser!.id
        );

        setIsAlreadyFriend(isFriend);
      } catch (error) {
      }
    }

    checkFriendship();
  }, [user, profileUser, isOwnProfile]);


  useEffect(() => {
    if (!profileUser?.id) return;

    async function fetchCars() {
      try {
        const response = await fetch(`/api/Car`);
        if (!response.ok)
          throw new Error('Failed to fetch cars');

        const allCars = await response.json();
        const userCars = allCars
          .filter((car: any) => car.user[0].id === profileUser!.id)
          .map((car: any) => ({
            id: car.id || '',
            brand: car.brand || '',
            model: car.model || '',
            color: car.color || '',
            licensePlate: car.licensePlate || '',
            seats: typeof car.seats === 'number' ? car.seats : parseInt(car.seats) || 0,
            user: car.user
          }));

        setCars(userCars);
      } catch (error) {
        showAlert({
          message: "Okänt fel.",
          backgroundColor: "danger",
          textColor: "white",
          duration: 3000,
        });
      }
    }

    fetchCars();
  }, [profileUser]);

  useEffect(() => {
    if (profileUser) {
      setUserPayload({
        user: {
          id: profileUser.id,
          username: profileUser.username,
          email: profileUser.email,
          firstName: profileUser.firstName,
          lastName: profileUser.lastName,
          phoneNumber: profileUser.phoneNumber,
          description: profileUser.description,
          rating: profileUser.rating,
          tripCount: profileUser.tripCount,
          preferences: profileUser.preferences,
          roles: profileUser.roles,
        },
      });
    }
  }, [profileUser]);

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
        roles: profileUser?.roles || [],
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
        roles: [],
      },
    });
  }

  async function handleSaveUser(updatedUser: User, profileFile?: File | null) {
    {
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

        if (profileFile) {
          await uploadMedia(profileFile);
          refreshProfileImage();
        }

        await refreshUser();

        setUserPayload({ user: savedUser });
        setShowUserModal(false);
      } catch (error) {
        showAlert({
          message: "Kunde inte spara ändringarna. Försök igen.",
          backgroundColor: "danger",
          textColor: "white",
          duration: 5000,
        });
      }
    }
  }

  // Car stuff
  const carTitle = isOwnProfile
    ? (isEdit ? "Redigera fordon" : "Lägg till fordon")
    : "Fordon";

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
    if (!user?.id) {
      return;
    }

    const isCreating = !isEdit;

    const payload = {
      title: `${user.lastName} - ${car.brand} ${car.model}`,
      brand: car.brand,
      model: car.model,
      color: car.color,
      licensePlate: car.licensePlate,
      seats: Number(car.seats),
      user: [{
        id: user.id,
        username: user.username
      }],
    };

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
        .filter((car: any) => car.user[0].id === user.id)
        .map((car: any) => ({
          id: car.id || '',
          brand: car.brand || '',
          model: car.model || '',
          color: car.color || '',
          licensePlate: car.licensePlate || '',
          seats: typeof car.seats === 'number' ? car.seats : parseInt(car.seats) || 0,
          userId: car.user
        }));

      setCars(updatedCars);
      handleCloseModal();

    } catch (error) {
      showAlert({
        message: "Kunde inte spara bil. Försök igen.",
        backgroundColor: "danger",
        textColor: "white",
        duration: 5000,
      });
    }
  }

  async function handleDeleteCar(car: typeof carPayload) {
    try {
      const deleteResponse = await fetch(`/api/Car/${car.id}`, { method: 'DELETE' });

      if (!deleteResponse.ok)
        throw new Error('Failed to delete car');

      const allCarsResponse = await fetch(`/api/Car`);
      const allCars = await allCarsResponse.json();
      const updatedCars = allCars
        .filter((c: any) => c.user[0].id === user?.id)
        .map((car: any) => ({
          id: car.id || '',
          brand: car.brand || '',
          model: car.model || '',
          color: car.color || '',
          licensePlate: car.licensePlate || '',
          seats: typeof car.seats === 'number' ? car.seats : parseInt(car.seats) || 0,
          userId: car.user
        }));

      setCars(updatedCars);
      handleCloseModal();

    } catch (error) {
      showAlert({
        message: "Kunde inte ta bort bil. Försök igen.",
        backgroundColor: "danger",
        textColor: "white",
        duration: 5000,
      });
    }
  }

  /* friendship stuff */

  async function handleAddFriend() {
    if (!user?.id || !profileUser?.id) return;

    try {
      const payload = {
        title: `${user.firstName} ${user.lastName} - ${profileUser.firstName} ${profileUser.lastName}`,
        user: [{
          id: user.id,
          username: user.username
        }],
        contact: [{
          id: profileUser.id,
          username: profileUser.username
        }]
      };

      const response = await fetch('/api/Contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsAlreadyFriend(true);
        showAlert({
          message: "Kontakt tillagd!",
          backgroundColor: "success",
          textColor: "white",
          duration: 3000,
        });
      } else {
        const error = await response.json();
        console.error('Error adding friend:', error);
        showAlert({
          message: "Kunde inte lägga till kontakt. Försök igen.",
          backgroundColor: "danger",
          textColor: "white",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Error adding friend:', error);
      showAlert({
        message: "Okänt fel. Försök igen.",
        backgroundColor: "danger",
        textColor: "white",
        duration: 5000,
      });
    }
  }

  async function handleRemoveFriend() {
    if (!user?.id || !profileUser?.id) return;

    try {
      const contactsResponse = await fetch('/api/Contact');
      const contacts = await contactsResponse.json();

      const contact = contacts.find((c: any) =>
        c.user?.[0]?.id === user.id &&
        c.contact?.[0]?.id === profileUser.id
      );

      if (contact) {
        const response = await fetch(`/api/Contact/${contact.id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setIsAlreadyFriend(false);
          showAlert({
            message: "Kontakt borttagen!",
            backgroundColor: "success",
            textColor: "white",
            duration: 3000,
          });
        }
      }
    } catch (error) {
      console.error('Error removing friend:', error);
      showAlert({
        message: "Okänt fel. Försök igen.",
        backgroundColor: "danger",
        textColor: "white",
        duration: 5000,
      });
    }
  }

  const handleLogout = () => {
    logout();
  };

  const handleAdminClicked = () => {
    navigate("/admin");
  };

  return (
    <>
      {profileUser && (
        <ProfileCard
          user={profileUser}
          profileImage={profileImage}
          isOwnProfile={isOwnProfile}
          isAlreadyFriend={isAlreadyFriend}
          onAddFriend={handleAddFriend}
          onRemoveFriend={handleRemoveFriend}
          onEdit={() =>
            handleEditUser({
              id: profileUser.id,
              username: profileUser.username,
              email: profileUser.email,
              firstName: profileUser.firstName,
              lastName: profileUser.lastName,
              phoneNumber: profileUser.phoneNumber,
              description: profileUser.description,
              rating: profileUser.rating,
              tripCount: profileUser.tripCount,
              preferences: preferences,
            })
          }
        />
      )}
      <div className="d-flex flex-column gap-3 mt-4">
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
          title={carTitle}
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
          <SmakButton className="mt-2" onClick={handleAddCar}>
            Lägg till fordon
          </SmakButton>
        )}

        {isOwnProfile && isAdmin && (
          <SmakButton onClick={handleAdminClicked}>
            Admin
          </SmakButton>
        )}

        {isOwnProfile && (
          <SmakButton
            color="secondary"
            className="mb-2"
            onClick={handleLogout}>
            Logga ut
          </SmakButton>
        )}
      </div>
    </>
  );
}
