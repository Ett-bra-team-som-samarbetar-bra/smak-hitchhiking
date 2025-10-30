import { useState } from "react";
import Row from "react-bootstrap/esm/Row";
import TripCardBig from "../../components/trip/TripCardBig";
import SmakContact from "../../components/SmakContact";
import { getAllTrips, getMockUsers, getMockUser } from "../../utils/MockData";
/* import { useAuth } from "../../hooks/useAuth"; */
import CarModal from "../profile/CarModal";
import { useNavigate } from "react-router-dom";

export default function TripsCurrentPage() {
  const currentUser = getMockUser();
  const allTrips = getAllTrips();
  const firstTrip = allTrips[0];

  // const { user } = useAuth();
  // When backend is ready: const isDriver = user?.id === firstTrip.driverId;
  const [isDriver, setIsDriver] = useState(true);

  const [requests, setRequests] = useState(getMockUsers());
  const [passengers, setPassengers] = useState<typeof requests>([]);

  const handleAcceptRequest = (user: any) => {
    setPassengers([...passengers, user]);
    setRequests(requests.filter(r => r !== user));
  };

  const handleDenyRequest = (user: any) => {
    setRequests(requests.filter(r => r !== user));
  };

  const handleRemovePassenger = (user: any) => {
    setPassengers(passengers.filter(p => p !== user));
  };

  /* car stuff */

  const [showCarModal, setShowCarModal] = useState(false);
  const [carPayload, setCarPayload] = useState({
    brand: "Volvo",
    model: "V60",
    color: "svart",
    licensePlate: "ABC123",
    seats: 3
  });

  const handleCarClick = () => {
    setShowCarModal(true);
  };

  const handleCloseCarModal = () => {
    setShowCarModal(false);
  };

  /* user > */

  const navigate = useNavigate();

  const handleUserClick = (user: any) => {
    navigate(`/profile/${user.id}`, { state: { user } });
  };

  return (
    <>
      {/* lil toggle todo: remove*/}
      <button onClick={() => setIsDriver(!isDriver)} className="btn btn-sm btn-primary mb-3">
        byt till: {isDriver ? "Passagerare" : "Förare"}
      </button>

      <Row className="d-flex align-items-center mb-4">
        <h2 className="mb-0">{isDriver ? "Förare" : "Passagerare"} <i className="bi bi-chevron-down"></i></h2>
      </Row>

      <TripCardBig
        startTime={firstTrip.startTime}
        endTime={firstTrip.endTime}
        startCity={firstTrip.startCity}
        endCity={firstTrip.endCity}
        distance={firstTrip.distance}
        date={firstTrip.date}
        firstName={currentUser.firstName}
        lastName={currentUser.lastName}
        profileImage={currentUser.profileImage}
        rating={currentUser.rating}
        vehicleInfo="volvo v60"
        numOfSeats="3"
        onCarClick={handleCarClick}
        onUserClick={() => handleUserClick(currentUser)}
      />

      <Row className="d-flex align-items-center my-4">
        <h2 className="mb-0">{isDriver ? "Passagerare" : "Övriga passagerare"} <i className="bi bi-chevron-down"></i></h2>
      </Row>
      {passengers.length === 0 && (
        <p className="text-black-50">Inga passagerare just nu.</p>
      )}
      <div className="d-flex flex-column gap-3">
        {passengers.map((user, index) => (
          <SmakContact
            key={index}
            user={user}
            isDriver={isDriver}
            isAddedToTrip={true}
            onClick={() => handleUserClick(user)}
            onRemove={isDriver ? () => handleRemovePassenger(user) : undefined}
          />
        ))}
      </div>

      {isDriver && (
        <>
          <Row className="d-flex align-items-center my-4">
            <h2 className="mb-0">Förfrågningar <i className="bi bi-chevron-down"></i></h2>
          </Row>
          {
            (requests.length === 0 && (
              <p className="text-black-50">Inga förfrågningar just nu.</p>
            ))
          }
          <div className="d-flex flex-column gap-3 mb-5">
            {requests.map((user, index) => (
              <SmakContact
                key={index}
                user={user}
                isDriver={true}
                isAddedToTrip={false}
                onClick={() => handleUserClick(user)}
                onAccept={() => handleAcceptRequest(user)}
                onDeny={() => handleDenyRequest(user)}
              />
            ))}
          </div>
        </>
      )}

      <CarModal
        show={showCarModal}
        onClose={handleCloseCarModal}
        payload={carPayload}
        setPayload={setCarPayload}
        isEdit={false}
        isOwnProfile={false}
      />
    </>
  )
}