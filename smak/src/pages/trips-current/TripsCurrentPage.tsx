import { useEffect, useState } from "react";
import TripCardBig from "../../components/trip/TripCardBig";
import SmakContact from "../../components/SmakContact";
import CarModal from "../profile/CarModal";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { useAuth } from "../../hooks/useAuth";
import useOnTrip from "../../hooks/useOnTrip";
import useFetchCar from "../../hooks/useFetchCar";
import useFetchPassengers from "../../hooks/useFetchPassengers";

export default function TripsCurrentPage() {
  const { user } = useAuth();
  const { currentTrip } = useOnTrip();
  const navigate = useNavigate();

  if (!currentTrip || !user) {
    return <p>Laddar..</p>;
  }
  const tripId = currentTrip?.id ?? "";
  const carId = currentTrip?.carIdId ?? "";
  const passengers = useFetchPassengers(tripId);
  const car = useFetchCar(carId);

  const [showCarModal, setShowCarModal] = useState(false);
  const [carPayload, setCarPayload] = useState({
    id: "",
    brand: "",
    model: "",
    color: "",
    licensePlate: "",
    seats: 0,
  });
  const isDriver = user.id === currentTrip?.driver[0].id;

  useEffect(() => {
    if (car) {
      setCarPayload({
        id: car?.id || "",
        brand: car?.brand || "",
        model: car?.model || "",
        color: car?.color || "",
        licensePlate: car?.licensePlate || "",
        seats: car?.seats || 0,
      });
    }
  }, [car]);

  const handleRemovePassenger = async (passenger: any) => {
    try {
      const result = await fetch("api/TripUser/", {
        method: "DELETE",
      });
      if (!result.ok) {
        console.log("the fuck bro", passenger);
      }
    } catch {
      console.log("the fuck bro");
    }
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
            <span className="fs-5 fw-semibold">Passagerare</span>
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
                    user={{
                      id: user.id,
                      firstName: user.firstName || "",
                      lastName: user.lastName || "",
                      rating: user.rating || "",
                      description: user.description || "",
                    }}
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
