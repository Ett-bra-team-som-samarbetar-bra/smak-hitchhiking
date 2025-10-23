import { renderRatingStars } from "../utils/Utils";
import IconButton from "./IconButton";
import SmakCard from "./SmakCard";
import { Col, Row } from "react-bootstrap";

export default function SmakContact({ user, isDriver = false, isAddedToTrip = false, className = "" }: {
  user: {
    firstName: string;
    lastName: string;
    profileImage: string;
    rating: number;
    description: string;
  }
  className?: string;
  isDriver?: boolean;
  isAddedToTrip?: boolean;
}) {
  return (
    <SmakCard className={`${className}`}>
      <Row
        className="cursor-pointer"
        onClick={() => console.log("User pressed")}>

        <Col className="col-auto d-flex align-items-center">
          <img
            src={user.profileImage}
            alt="Profile"
            className=""
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "5px",
              objectFit: "cover",
            }}
          />
        </Col>

        <Col className="d-flex flex-column justify-content-start py-1 px-0 flex-grow-1">
          <h6 className="m-0 mb-1 text-primary fw-bold">{user.firstName} {user.lastName}</h6>
          {isDriver ? (
            <div className="d-flex align-items-center gap-1 small text-black-50">
              {renderRatingStars(user.rating)}
            </div>
          ) : (
            <p className="m-0 text-black-50 small">{user.description}</p>
          )}
        </Col>

        <Col className="d-flex align-items-center justify-content-end gap-2 flex-grow-0 px-0 pe-2">
          {isDriver && !isAddedToTrip && (
            <>
              <IconButton
                icon="bi-x-square-fill"
                variant="flat"
                onClick={() => console.log("Denied request")}
              />
              <IconButton
                icon="bi-check-square-fill"
                variant="flat"
                onClick={() => console.log("Accepted request")}
              />
            </>
          )}
          {isAddedToTrip && (
            <IconButton
              icon="bi-trash"
              variant="flat"
              onClick={() => console.log("Removed from trip")}
            />
          )}
        </Col>
      </Row>
    </SmakCard >
  );
}
