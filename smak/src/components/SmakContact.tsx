import { renderRatingStars } from "../utils/Utils";
import { Col, Row } from "react-bootstrap";
import IconButton from "./IconButton";
import SmakCard from "./SmakCard";
import useProfileImage from "../hooks/useProfileImage";

export default function SmakContact({ user, isDriver = false, isAddedToTrip = false, className = "", onClick, onAccept, onDeny, onRemove }: {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    rating: number;
    description: string;
  }
  className?: string;
  isDriver?: boolean;
  isAddedToTrip?: boolean;
  onClick?: () => void;
  onAccept?: () => void;
  onDeny?: () => void;
  onRemove?: () => void;

}) {

  const { profileImage } = useProfileImage(
    user?.id || null
  );

  return (
    <SmakCard className={`${className}`}>
      <Row
        className="cursor-pointer"
        onClick={onClick}>

        <Col className="col-auto d-flex align-items-center">
          <img
            src={profileImage}
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
                icon="bi-check-square-fill"
                variant="flat"
                onClick={() => onAccept?.()}
              />
              <IconButton
                icon="bi-x-square-fill"
                variant="flat"
                onClick={() => onDeny?.()}
              />
            </>
          )}
          {isAddedToTrip && onRemove && (
            <IconButton
              icon="bi-trash"
              variant="flat"
              onClick={() => onRemove()}
            />
          )}
        </Col>
      </Row>
    </SmakCard >
  );
}
