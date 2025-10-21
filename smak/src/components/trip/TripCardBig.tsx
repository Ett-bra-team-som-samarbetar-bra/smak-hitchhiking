import { Col, Row } from "react-bootstrap";
import { renderRatingStars } from "../../utils/Utils";
import SmakCard from "../SmakCard";
import DividerLine from "../DividerLine";
import "../../components/trip/TripCard.scss";

interface TripCardProps {
  firstName?: string;
  lastName?: string;
  startCity?: string;
  endCity?: string;
  startTime?: string;
  endTime?: string;
  rating?: number;
  distance?: number;
  date?: string;
  vehicleInfo?: string;
  numOfSeats?: string;
  className?: string;
}

export default function TripCardBig({
  firstName = "Okänd",
  lastName = "användare",
  startCity = "Okänd stad",
  endCity = "Okänd stad",
  startTime = "00:00",
  endTime = "00:00",
  rating = 0,
  distance = 0,
  date = "?",
  vehicleInfo = "Okänd bil",
  numOfSeats = "?",
  className = "",
}: TripCardProps) {
  const userName = `${firstName} ${lastName}`;

  return (
    <SmakCard className={`${className} p-3 pb-0 `}>

      <div className="position-relative pb-5">
        <img
          src="/images/development/placeholder-map.png"
          className="w-100 trip-card-map-image rounded-2"
          alt="Ruttkarta" />
        <div className="position-absolute trip-card-profil-image-container">
          <img
            src="/images/development/user2.png"
            alt="Profil"
            className="rounded-2 trip-card-profil-image rounded-circle" />
        </div>
        <h3 className="text-primary fw-bold fs-2 position-absolute mt-3">{date}</h3>
      </div>

      <Row className="trip-card-small-height py-2">
        <Col xs={8} className="pt-2">
          <Row className="h-100">
            <Col className="d-flex trip-card-time-width">
              <div>
                <p className="fw-bold text-primary">{startTime}</p>
                <p className="fw-bold text-primary">{endTime}</p>
              </div>
            </Col>

            <Col className="d-flex justify-content-center trip-card-line-width">
              <div className="d-flex flex-column align-items-center">
                <div className="bg-primary rounded-circle trip-card-circle" ></div>
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

        <Col xs={4} className="d-flex align-items-center flex-column">
          <div className="text-primary text-center m-0 fw-semibold medium-font-size">{userName}</div>
          <div className="d-flex small-font-size">
            {renderRatingStars(rating)}
          </div>
          <p className="text-primary fw-semibold  medium-font-size">{distance}km</p>
        </Col>
      </Row>

      <DividerLine variant="info" />

      <Row className="py-2">
        <Col className="d-flex align-items-center">
          <i className="bi bi-car-front-fill me-2 text-black"></i>
          <span className="text-black fw-semibold">{vehicleInfo}<span className="text-secondary fw-normal"> - {numOfSeats} säten</span></span>
        </Col>
      </Row>
    </SmakCard >
  );
}
