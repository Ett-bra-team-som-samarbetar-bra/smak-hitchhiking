import { Col, Row } from "react-bootstrap";
import { renderRatingStars } from "../../utils/Utils";
import { useTripCount } from "../../context/TripCountProvider";
import { getTripDateAndTime } from "../../utils/DateUtils";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useSmakTopAlert } from "../../context/SmakTopAlertProvider";
import { bookTrip, cancelTrip, checkIfBooked, deleteTrip } from "../../utils/TripBookings";
import type TripCardProps from "../../interfaces/TripCardProps";
import SmakCard from "../SmakCard";
import DividerLine from "../DividerLine";
import TripCardButton from "./TripCardButton";
import StaticMap from "./StaticMap";
import useFetchUser from "../../hooks/useFetchUser";
import useFetchCar from "../../hooks/useFetchCar";
import useProfileImage from "../../hooks/useProfileImage";
import CarModal from "../../pages/profile/CarModal";
import "../../components/trip/TripCard.scss";

export default function TripCardBig(props: TripCardProps) {
  const { comingCount, setComingCount } = useTripCount();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    trip,
    className = "",
    cardButtonType = "none",
    onButtonClick,
    onBigTripCardClick,
    onTripCancelled,
    isBooked,
  } = props;

  if (!trip || !trip.driver?.length) {
    return <div> Laddar resa...</div>;
  }

  const { startPosition, endPosition, seats, distance } = trip;
  const { date, startTime, endTime } = getTripDateAndTime(trip);
  const { showAlert } = useSmakTopAlert();
  const { profileImage } = useProfileImage(trip.driver[0].id ?? null);

  const cardUser = useFetchUser(trip.driver[0].id ?? null);
  const vehicle = useFetchCar(trip.carIdId ?? null);

  const [showCarModal, setShowCarModal] = useState(false);
  const [carPayload, setCarPayload] = useState({
    id: "",
    brand: "",
    model: "",
    color: "",
    licensePlate: "",
    seats: 0,
  });
  const [isTripBooked, setIsTripBooked] = useState(false);
  const seatsLabel = vehicle
    ? (Number(vehicle.seats) === 1 ? "plats" : "platser")
    : "";
  // Check if this trip is already booked by the current user
  useEffect(() => {
    if (!user?.id || !trip?.id) return;

    async function checkBookingStatus() {
      const isBooked = await checkIfBooked(trip.id, user!.id);
      setIsTripBooked(isBooked);
    }

    checkBookingStatus();
  }, [user?.id, trip?.id, checkIfBooked]);

  const rating = cardUser?.rating;
  const firstName = cardUser?.firstName || "Okänd";
  const lastName = cardUser?.lastName || "Användare";
  const vehicleInfo = vehicle
    ? isBooked
      ? `${vehicle.model} ${vehicle.licensePlate}`
      : `${vehicle.brand} ${vehicle.model}`
    : "Okänd bil";

  // Check if current user is the driver
  const isDriver = trip.driver[0]?.id === user?.id;

  let buttonText = "";
  switch (cardButtonType) {
    // Passenger
    case "userBook":
      buttonText = isTripBooked ? "Avboka" : "Boka";
      break;
    case "userCancel":
      buttonText = isDriver ? "Ta bort" : "Avboka";
      break;
    // Driver
    case "driverStart":
      buttonText = "Starta resa";
      break;
    case "driverDone":
      buttonText = "Avsluta resa";
      break;
    default:
      buttonText = "";
      break;
  }

  // Update tripCount on footer badges
  const handleOnButtonClick = async () => {

    // Driver cannot book own trip
    if (isDriver && cardButtonType === "userBook") {
      showAlert({
        message: "Du kan inte boka din egen resa.",
        backgroundColor: "warning",
        textColor: "white",
        duration: 3000,
      });
      return;
    }

    // Passenger
    if (cardButtonType === "userBook") {
      if (isTripBooked) {
        try {
          await cancelTrip(trip.id, user!.id);
          setComingCount(Math.max(comingCount - 1, 0));
          setIsTripBooked(false);

          showAlert({
            message: "Resan har avbokats!",
            backgroundColor: "success",
            textColor: "white",
            duration: 3000,
          });
        } catch (error) {
          showAlert({
            message: "Ett fel uppstod vid avbokning. Försök igen.",
            backgroundColor: "danger",
            textColor: "white",
            duration: 3000,
          });
        }
      } else {
        try {
          await bookTrip(trip.id, user!.id, user!.username);
          setComingCount(comingCount + 1);
          setIsTripBooked(true);

          showAlert({
            message: "Resan har bokats!",
            backgroundColor: "success",
            textColor: "white",
            duration: 3000,
          });
        } catch (error) {
          showAlert({
            message: "Ett fel uppstod vid bokning. Försök igen.",
            backgroundColor: "danger",
            textColor: "white",
            duration: 3000,
          });
        }
      }
    }
    else if (cardButtonType === "userCancel") {
      if (isDriver) {
        // Driver deleting the trip
        try {
          await deleteTrip(trip.id);
          setComingCount(Math.max(comingCount - 1, 0));

          if (onTripCancelled) {
            onTripCancelled(trip.id);
          }

          showAlert({
            message: "Resan har tagits bort!",
            backgroundColor: "success",
            textColor: "white",
            duration: 3000,
          });
        } catch (error) {
          showAlert({
            message: "Ett fel uppstod vid borttagning av resa. Försök igen.",
            backgroundColor: "danger",
            textColor: "white",
            duration: 3000,
          });
        }
      } else {
        // Passenger canceling booking
        try {
          await cancelTrip(trip.id, user!.id);
          setComingCount(Math.max(comingCount - 1, 0));
          setIsTripBooked(false);

          if (onTripCancelled) {
            onTripCancelled(trip.id);
          }

          showAlert({
            message: "Resan har avbokats!",
            backgroundColor: "success",
            textColor: "white",
            duration: 3000,
          });
        } catch (error) {
          showAlert({
            message: "Ett fel uppstod vid avbokning. Försök igen.",
            backgroundColor: "danger",
            textColor: "white",
            duration: 3000,
          });
        }
      }
    }

    if (onButtonClick) onButtonClick();
  };

  const handleCarClick = () => {
    setCarPayload({
      id: vehicle?.id || "",
      brand: vehicle?.brand || "",
      model: vehicle?.model || "",
      color: vehicle?.color || "",
      licensePlate: vehicle?.licensePlate || "",
      seats: vehicle?.seats || 0,
    });
    setShowCarModal(true);
  };

  const handleUserClick = () => {

    if (cardUser?.id === user?.id) {
      navigate(`/profile`);
    }
    else {
      navigate(`/profile/${cardUser?.id}`, { state: { user: cardUser } });
    }
  }

  return (
    <>
      <SmakCard className={`${className} pb-0`}>
        <div
          className="position-relative pb-5 cursor-pointer"
          onClick={onBigTripCardClick}
        >
          <StaticMap
            from={startPosition}
            to={endPosition}
            width="740"
            height="400"
            className="trip-card-map-image w-100"
          />

          <div className="position-absolute trip-card-profil-image-container">
            <div className="d-flex justify-content-center">
              <img
                onClick={handleUserClick}
                src={profileImage}
                alt="Profil"
                className="rounded-2 trip-card-profil-image rounded-circle cursor-pointer"
              />
            </div>

            <div className="position-relative d-flex align-items-center flex-column mt-2">
              <div className="text-primary text-center m-0 fw-semibold medium-font-size">
                {`${firstName} ${lastName}`}
              </div>
              <div className="d-flex small-font-size">
                {renderRatingStars(rating)}
              </div>
              <p className="text-primary fw-semibold medium-font-size mb-1">
                {distance}km
              </p>

              <div id="trip-card-button-mobile-hide" className="mt-2">
                {cardButtonType !== "none" && (
                  <TripCardButton
                    label={buttonText}
                    onClick={handleOnButtonClick}
                  ></TripCardButton>
                )}
              </div>
            </div>
          </div>
          <h3 className="text-primary fw-bold fs-2 position-absolute mt-3">
            {date}
          </h3>
        </div>

        <Row className="trip-card-large-height pt-2 ">
          <Col className="pt-2">
            <Row className="h-100">
              <Col className="d-flex trip-card-time-width">
                <div className="d-flex flex-column">
                  <p className="fw-bold text-primary">{startTime}</p>
                  <p className="fw-bold text-primary">{endTime}</p>
                </div>
              </Col>

              <Col className="d-flex justify-content-center trip-card-line-width">
                <div className="d-flex flex-column align-items-center">
                  <div className="bg-primary rounded-circle trip-card-circle"></div>
                  <div className="bg-black trip-card-line"></div>
                  <div className="bg-primary rounded-circle trip-card-circle"></div>
                </div>
              </Col>

              <Col className="d-flex ps-0 flex-grow-1">
                <div>
                  <p className="fw-bold text-primary">{startPosition}</p>
                  <p className="fw-bold text-primary">{endPosition}</p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <div
          id="trip-card-button-desktop-hide"
          className="mb-2 trip-card-button-width w-100"
        >
          <div className="d-flex justify-content-end me-3">
            {cardButtonType !== "none" && (
              <TripCardButton
                label={buttonText}
                onClick={handleOnButtonClick}
              ></TripCardButton>
            )}
          </div>
        </div>

        {trip.tripInfo && (
          <>
            <Row className="py-4">
              <Col className="d-flex flex-column">
                <div className="d-flex align-items-center justify-content-center fs-5 text-primary fw-semibold mb-2">
                  <i className="bi bi-info-circle text-primary me-2"></i>
                  <span >Information</span>
                </div>
                <span className="text-secondary fst-italic mt-1 fs-6">
                  {trip.tripInfo}
                </span>
              </Col>
            </Row>
          </>
        )}

        <DividerLine variant="info" />

        <Row className="py-2 cursor-pointer" onClick={handleCarClick}>
          <Col xs={10} className="d-flex align-items-center">
            <i className="bi bi-car-front-fill me-2 text-black"></i>
            <span className="text-black fw-semibold">
              {vehicleInfo}
              <span className="text-secondary fw-normal"> - {seats} {seatsLabel}</span>
            </span>
          </Col>

          <Col xs={2} className="d-flex justify-content-end align-items-center">
            <i className="bi bi-info-circle fs-6 text-secondary"></i>
          </Col>
        </Row>
      </SmakCard>

      <CarModal
        title="Fordon"
        show={showCarModal}
        onClose={() => setShowCarModal(false)}
        payload={carPayload}
        setPayload={() => { }}
        isEdit={false}
        isOwnProfile={false}
      />
    </>
  );
}
