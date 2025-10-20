
import { Button } from "react-bootstrap";
import SmakCard from "../../components/SmakCard";

export default function CarCard({ car, isOwnProfile = true }: {
    car: {
        model: string;
        licensePlate: string;
        seats: number;
    };
    isOwnProfile?: boolean;
}) {
    return (
        <SmakCard className="mb-3 p-3">
            <div className="d-flex justify-content-between gap-3 align-items-center">

                <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-car-front fs-1 text-black"></i>

                    <div className="d-flex flex-column align-items-start">
                        <p className="m-0  fs-5 text-black">{car.model}</p>
                        <p className="m-0 text-black-50 small">{car.licensePlate} - {car.seats} säten</p>
                    </div>
                </div>
                {isOwnProfile ? (
                    <Button
                        className="bi bi-pencil-fill fs-4 text-black rounded-circle  bg-white border-0"
                        onClick={() => console.log("Edit car")}
                    />
                ) : (
                    <Button className="bi bi-info-circle fs-1 text-black rounded-circle  bg-white border-0"
                        onClick={() => console.log("View car details")}
                    ></Button>
                )}
            </div>
        </SmakCard>

    );
}
