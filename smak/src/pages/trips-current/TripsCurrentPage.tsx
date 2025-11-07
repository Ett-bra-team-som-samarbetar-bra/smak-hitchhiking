import { useState } from "react";
import TripCardBig from "../../components/trip/TripCardBig";
import SmakContact from "../../components/SmakContact";
import { getMockUsers } from "../../utils/MockData";
//import { useAuth } from "../../hooks/useAuth";
import CarModal from "../profile/CarModal";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { useAuth } from "../../hooks/useAuth";
import useOnTrip from "../../hooks/useOnTrip";

export default function TripsCurrentPage() {
  const { user } = useAuth();
  const { currentTrip } = useOnTrip();
  const navigate = useNavigate();

  const [requests, setRequests] = useState(getMockUsers());
  const [passengers, setPassengers] = useState<typeof requests>([]);
  const [showCarModal, setShowCarModal] = useState(false);
  const [carPayload, setCarPayload] = useState({
    id: "",
    brand: "Volvo",
    model: "V60",
    color: "svart",
    licensePlate: "ABC123",
    seats: 3,
  });
  if (!user || !currentTrip) return;
  const isDriver = user.id === currentTrip?.driver[0].id;

  const handleAcceptRequest = (passenger: any) => {
    setPassengers([...passengers, passenger]);
    setRequests(requests.filter((r) => r !== passenger));
  };

  const handleDenyRequest = (passenger: any) => {
    setRequests(requests.filter((r) => r !== passenger));
  };

  const handleRemovePassenger = (passenger: any) => {
    setPassengers(passengers.filter((p) => p !== passenger));
  };

  /* car stuff */

  const handleCarClick = () => {
    setShowCarModal(true);
  };

  const handleCloseCarModal = () => {
    setShowCarModal(false);
  };

  /* user > */

  const handleUserClick = (user: any) => {
    navigate(`/profile/${user.id}`, { state: { user } });
  };

  return (
    <>
      <Accordion
        defaultActiveKey={["0", "1", "2"]}
        alwaysOpen
        className="mb-4 custom-accordion"
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header className="py-1">
            <span className="fs-5 fw-semibold">Förare</span>
            <i className="bi bi-caret-down-fill ms-2"></i>
          </Accordion.Header>
          <Accordion.Body>
            <TripCardBig
              trip={currentTrip}
              onCarClick={handleCarClick}
              onUserClick={() => handleUserClick(user)}
            />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header className="py-1">
            <span className="fs-5 fw-semibold">
              {isDriver ? "Passagerare" : "Övriga passagerare"}
            </span>
            <i className="bi bi-caret-down-fill ms-2"></i>
          </Accordion.Header>
          <Accordion.Body>
            {passengers.length === 0 ? (
              <p className="text-black-50">Inga passagerare just nu.</p>
            ) : (
              <div className="d-flex flex-column gap-3">
                {passengers.map((user, index) => (
                  <SmakContact
                    key={index}
                    user={user}
                    isDriver={isDriver}
                    isAddedToTrip={true}
                    onClick={() => handleUserClick(user)}
                    onRemove={
                      isDriver ? () => handleRemovePassenger(user) : undefined
                    }
                  />
                ))}
              </div>
            )}
          </Accordion.Body>
        </Accordion.Item>

        {isDriver && (
          <Accordion.Item eventKey="2">
            <Accordion.Header className="py-1">
              <span className="fs-5 fw-semibold">Förfrågningar</span>
              <i className="bi bi-caret-down-fill ms-2"></i>
            </Accordion.Header>
            <Accordion.Body>
              {requests.length === 0 ? (
                <p className="text-black-50">Inga förfrågningar just nu.</p>
              ) : (
                <div className="d-flex flex-column gap-3 mb-3">
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
              )}
            </Accordion.Body>
          </Accordion.Item>
        )}
      </Accordion>

      <CarModal
        title="Fordon"
        show={showCarModal}
        onClose={handleCloseCarModal}
        payload={carPayload}
        setPayload={setCarPayload}
        isEdit={false}
        isOwnProfile={false}
      />
    </>
  );
}
