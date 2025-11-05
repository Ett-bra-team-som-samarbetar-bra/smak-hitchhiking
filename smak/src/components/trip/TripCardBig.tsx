import { Col, Row } from "react-bootstrap";
import { renderRatingStars } from "../../utils/Utils";
import type TripCardProps from "../../interfaces/TripCardProps";
import SmakCard from "../SmakCard";
import DividerLine from "../DividerLine";
import TripCardButton from "./TripCardButton";
import StaticMap from "./StaticMap";
import "../../components/trip/TripCard.scss";
import { useTripCount } from "../../context/TripCountProvider";
import { getTripDateAndTime } from "../../utils/DateUtils";
import useFetchUser from "../../hooks/useFetchUser";
import useFetchCar from "../../hooks/useFetchCar";
import useProfileImage from "../../hooks/useProfileImage";

export default function TripCardBig(props: TripCardProps) {
  const { comingCount, setComingCount } = useTripCount();

  const {
    trip,
    endTime = "00:00",
    rating = 0,
    distance = 0,
    className = "",
    cardButtonType = "none",
    onButtonClick,
    onUserClick,
    onCarClick,
    onBigTripCardClick,
    isBooked,
  } = props;
  const { startPosition, endPosition, seats, driverId } = trip;
  const { date, startTime } = getTripDateAndTime(trip);
  const { profileImage } = useProfileImage(trip.driverId[0].id);

  const user = useFetchUser(driverId[0].id);
  const firstName = user?.firstName || "Okänd";
  const lastName = user?.lastName || "Användare";
  const vehicle = useFetchCar(trip.carIdId);
  const vehicleInfo = isBooked
    ? `${vehicle?.model}`
    : `${vehicle?.model} ${vehicle?.licensePlate}`;

  let buttonText = "";
  switch (cardButtonType) {
    // Passenger
    case "userBook":
      buttonText = "Boka";
      break;
    case "userCancel":
      buttonText = "Avboka";
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
  const handleOnButtonClick = () => {
    // Passenger
    if (cardButtonType === "userBook") setComingCount(comingCount + 1);
    else if (cardButtonType === "userCancel")
      setComingCount(Math.max(comingCount - 1, 0));

    // Driver
    if (cardButtonType === "driverStart")
      setComingCount(Math.max(comingCount - 1, 0));
    // TODO also remove this trip from /coming-trips

    if (onButtonClick) onButtonClick();
  };

  return (
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
              onClick={onUserClick}
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
              onClick={onButtonClick}
            ></TripCardButton>
          )}
        </div>
      </div>

      <DividerLine variant="info" />

      <Row className="py-2 cursor-pointer" onClick={onCarClick}>
        <Col xs={10} className="d-flex align-items-center">
          <i className="bi bi-car-front-fill me-2 text-black"></i>
          <span className="text-black fw-semibold">
            {vehicleInfo}
            <span className="text-secondary fw-normal"> - {seats} säten</span>
          </span>
        </Col>

        <Col xs={2} className="d-flex justify-content-end align-items-center">
          <i className="bi bi-info-circle fs-6 text-secondary"></i>
        </Col>
      </Row>
    </SmakCard>
  );
}
