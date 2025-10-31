import { Col, Row } from "react-bootstrap";
import { renderRatingStars } from "../../utils/Utils";
import type TripCardProps from "../../interfaces/TripCardProps";
import SmakCard from "../SmakCard";
import DividerLine from "../DividerLine";
import TripCardButton from "./TripCardButton";
import StaticMap from "./StaticMap";
import "../../components/trip/TripCard.scss";

export default function TripCardBig(props: TripCardProps) {
  const {
    firstName = "Okänd",
    lastName = "användare",
    startCity = "Okänd stad",
    endCity = "Okänd stad",
    startTime = "00:00",
    endTime = "00:00",
    rating = 0,
    distance = 0,
    date = "?",
    profileImage = "/images/development/user2.png",
    vehicleInfo = "Okänd bil",
    numOfSeats = "?",
    className = "",
    cardButtonType = "none",
    onButtonClick,
    onUserClick,
    onCarClick,
    onBigTripCardClick,
  } = props;

  const userName = `${firstName} ${lastName}`;
  const buttonText =
    cardButtonType === "book"
      ? "Boka"
      : cardButtonType === "cancel"
        ? "Avboka"
        : "";

  return (
    <SmakCard className={`${className} pb-0`}>
      <div
        className="position-relative pb-5 cursor-pointer"
        onClick={onBigTripCardClick}>
        <StaticMap
          from={startCity}
          to={endCity}
          width="740"
          height="400"
          className="trip-card-map-image w-100" />

        <div className="position-absolute trip-card-profil-image-container">
          <img
            onClick={onUserClick}
            src={profileImage}
            alt="Profil"
            className="rounded-2 trip-card-profil-image rounded-circle cursor-pointer" />

          <div className="position-relative d-flex align-items-center flex-column mt-2">
            <div className="text-primary text-center m-0 fw-semibold medium-font-size">
              {userName}
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
                  onClick={onButtonClick}
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
                <p className="fw-bold text-primary">{startCity}</p>
                <p className="fw-bold text-primary">{endCity}</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <div
        id="trip-card-button-desktop-hide"
        className="mb-2 trip-card-button-width w-100">
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
            <span className="text-secondary fw-normal">
              {" "}
              - {numOfSeats} säten
            </span>
          </span>
        </Col>

        <Col xs={2} className="d-flex justify-content-end align-items-center">
          <i className="bi bi-info-circle fs-6 text-secondary"></i>
        </Col>
      </Row>
    </SmakCard>
  );
}
