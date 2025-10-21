import SmakButton from "../../components/SmakButton";
import CarCard from "./CarCard";
import ProfileCard from "./ProfileCard";

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
      model: "Audi A3",
      licensePlate: "KEK 057",
      seats: 4,
    },
    {
      model: "Volvo V60",
      licensePlate: "FBI 007",
      seats: 4,
    }
  ];

  const isOwnProfile = true;
  const isAlreadyFriend = false;

  return (
    <>
      <ProfileCard user={mockUser} isOwnProfile={isOwnProfile} isAlreadyFriend={isAlreadyFriend} />
      <h2 className="my-3">Fordon:</h2>

      {mockCars.length === 0 ? (
        <p className="text-muted">Inga fordon tillagda</p>
      ) : (
        mockCars.map((car, index) => (
          <CarCard key={index} car={car} isOwnProfile={isOwnProfile} />
        ))
      )}
      {isOwnProfile && <SmakButton className="my-3" onClick={() => console.log("Add vehicle clicked")}>
        Lägg till fordon
      </SmakButton>
      }
    </>
  );
}
