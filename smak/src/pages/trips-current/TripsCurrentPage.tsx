import { useState } from "react";
import Row from "react-bootstrap/esm/Row";
import TripCardBig from "../../components/trip/TripCardBig";
import SmakContact from "../../components/SmakContact";
import { getAllTrips, getMockUsers, getMockUser } from "../../utils/MockData";
import { useAuth } from "../../hooks/useAuth";

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

  return (
    <>
      {/* lil toggle */}
      <button onClick={() => setIsDriver(!isDriver)} className="btn btn-sm btn-primary mb-3">
        byt till: {isDriver ? "Passagerare" : "Förare"}
      </button>

      <Row className="d-flex align-items-center mb-3">
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
      />

      <Row className="d-flex align-items-center my-3">
        <h2 className="mb-0">{isDriver ? "Passagerare" : "Övriga passagerare"} <i className="bi bi-chevron-down"></i></h2>
      </Row>
      <div className="d-flex flex-column gap-3 mb-5">
        {passengers.map((user, index) => (
          <SmakContact
            key={index}
            user={user}
            isDriver={isDriver}
            isAddedToTrip={true}
            onRemove={isDriver ? () => handleRemovePassenger(user) : undefined}
          />
        ))}
      </div>

      {isDriver && (
        <>
          <Row className="d-flex align-items-center my-3">
            <h2 className="mb-0">Förfrågningar <i className="bi bi-chevron-down"></i></h2>
          </Row>
          <div className="d-flex flex-column gap-3 mb-5">
            {requests.map((user, index) => (
              <SmakContact
                key={index}
                user={user}
                isDriver={true}
                isAddedToTrip={false}
                onAccept={() => handleAcceptRequest(user)}
                onDeny={() => handleDenyRequest(user)}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}