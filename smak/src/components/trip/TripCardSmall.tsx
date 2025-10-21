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
}

export default function TripCard({
  firstName = "Okänd",
  lastName = "användare",
  startCity = "Okänd stad",
  endCity = "Okänd stad",
  startTime = "00:00",
  endTime = "00:00",
  rating = 0,
  distance = 0
}: TripCardProps) {
  const userName = `${firstName} ${lastName}`;

  return (
    <SmakCard className="my-4 p-3 pb-0">
      <Row className="trip-card-small-height">
        <Col xs={9}>
          <Row className="h-100">
            <Col xs={2} className="d-flex">
              <div>
                <p className="fw-bold text-primary">{startTime}</p>
                <p className="fw-bold text-primary">{endTime}</p>
              </div>
            </Col>

            <Col xs={1} className="d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <div className="bg-primary rounded-circle trip-card-circle" ></div>
                <div className="bg-black trip-card-line"></div>
                <div className="bg-primary rounded-circle trip-card-circle"></div>
              </div>
            </Col>

            <Col xs={9} className="d-flex ps-0">
              <div>
                <p className="fw-bold text-primary">{startCity}</p>
                <p className="fw-bold text-primary">{endCity}</p>
              </div>
            </Col>
          </Row>
        </Col>

        <Col xs={3} className="d-flex justify-content-end align-items-start">
          <p className="text-primary fw-bold">{distance}km</p>
        </Col>
      </Row>

      <DividerLine variant="info" />

      <Row className="py-3 align-items-center">
        <Col xs={12} className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <img
              src="/images/debug/harold-pain.png" // TODO
              alt="Profil"
              className="rounded-circle"
              width="38"
              height="38"
              style={{ objectFit: 'cover' }} />
            <p className="text-primary mb-0 fw-semibold">{userName}</p>
          </div>

          <div className="d-flex gap-1">
            {renderRatingStars(rating)}
          </div>
        </Col>
      </Row>
    </SmakCard>
  );
}
