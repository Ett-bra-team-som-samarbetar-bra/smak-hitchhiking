import SmakCard from "../../components/SmakCard";
import IconButton from "../../components/IconButton";

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
                    <i className="bi bi-car-front-fill fs-1 text-black"></i>

                    <div className="d-flex flex-column align-items-start">
                        <p className="m-0  fs-5 text-black">{car.model}</p>
                        <p className="m-0 text-black-50 small">{car.licensePlate} - {car.seats} säten</p>
                    </div>
                </div>

                <IconButton
                    icon={isOwnProfile ? "bi-pencil-fill" : "bi-info-circle"}
                    onClick={() => console.log("Edit car")}
                    variant="flat" 
                    className="p-2"
                />

            </div>
        </SmakCard>

    );
}
