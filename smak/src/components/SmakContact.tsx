import SmakCard from "./SmakCard";
import { Button, Col, Row } from "react-bootstrap";
export default function SmakContact({ user, isDriver = false, isAddedToTrip = false }: {
    user: {
        firstName: string;
        lastName: string;
        profileImage: string;
        description: string;
    }
    isDriver: boolean;
    isAddedToTrip: boolean;
}) {
    return (
        <SmakCard className="mb-3 p-2">
            <Row >

                <Col className="col-auto">
                    <img
                        src={user.profileImage}
                        alt="Profile"
                        className="shadow"
                        style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "5px",
                            objectFit: "cover",
                        }}
                    />
                </Col>

                <Col className="d-flex flex-column justify-content-start py-1 flex-grow-1">
                    <h4 className="m-0 mb-1">{user.firstName} {user.lastName}</h4>
                    <p className="m-0 text-black-50 small">{user.description}</p>
                </Col>

                <Col className="d-flex align-items-center justify-content-end gap-2 flex-grow-0 p-3">
                    {isDriver && !isAddedToTrip && (
                        <>
                            <Button
                                className="bi bi-x-square-fill bg-white text-black border-0 p-0 fs-4"
                                onClick={() => console.log("Denied request")}
                            />
                            <Button
                                className="bi bi-check-square-fill bg-white text-black border-0 p-0 fs-4"
                                onClick={() => console.log("Accepted request")}
                            />
                        </>
                    )}
                    {isAddedToTrip && (
                        <Button
                            className="bi bi-trash bg-white text-black border-0 fs-4"
                            onClick={() => console.log("Removed from trip")}
                        />
                    )}
                </Col>
            </Row>
        </SmakCard>
    );
}
