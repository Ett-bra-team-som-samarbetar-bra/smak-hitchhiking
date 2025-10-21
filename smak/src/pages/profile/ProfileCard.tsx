import { Button } from "react-bootstrap";
import SmakCard from "../../components/SmakCard";

export default function ProfileCard({ user, isOwnProfile = true, isAlreadyFriend = false }: {
    user: {
        firstName: string;
        lastName: string;
        profileImage: string;
        trips: number;
        rating: string;
        activeYears: string;
        preferences: string[];
    }
    isOwnProfile?: boolean;
    isAlreadyFriend?: boolean;
}) {
    return (

        <SmakCard className="card-div text-center profile-card px-5 pb-5 position-relative">
            <div className="profile-image-container">
                <img src={user.profileImage} alt="Profile" className="profile-image shadow" />

                <Button
                    className={`${isOwnProfile
                        ? "bi bi-pencil-fill edit-icon"
                        : isAlreadyFriend
                            ? "bi bi-trash add-icon"
                            : "bi bi-person-add add-icon"
                        } d-flex justify-content-center align-items-center border-0 shadow bg-white rounded-circle text-black`}
                    onClick={() => {
                        if (isOwnProfile) {
                            console.log("Edit profile clicked");
                        } else if (isAlreadyFriend) {
                            console.log("Remove friend clicked");
                        } else {
                            console.log("Add friend clicked");
                        }
                    }}
                />

            </div>

            <h2>{user.firstName} {user.lastName}</h2>

            <div className="d-flex justify-content-between mt-2 mb-4">
                <div className="text-center">
                    <p className="mb-1 fw-bold">{user.trips}</p>
                    <p className="mb-0 text-black-50">Rutter</p>
                </div>

                <div className="text-center">
                    <p className="mb-1 fw-bold">{user.rating}/5</p>
                    <p className="mb-0 text-black-50">Betyg</p>
                </div>

                <div className="text-center">
                    <p className="mb-1 fw-bold">{user.activeYears}</p>
                    <p className="mb-0 text-black-50">År</p>
                </div>
            </div>

            <div className="d-inline-flex flex-row align-items-center justify-content-center gap-2g my-2 border-bottom border-black">
                <i className="bi bi-rocket-takeoff-fill"></i>
                <p className="my-2">Jag gillar</p>
            </div>

            <div className="d-flex flex-column mt-2">
                {user.preferences.length > 0 && (
                    <>
                        <div className="d-flex justify-content-between gap-2">
                            <p>{user.preferences[0]}</p>
                            <p>{user.preferences[1]}</p>
                        </div>
                        <div className="d-flex justify-content-between gap-2">
                            <p>{user.preferences[2]}</p>
                            <p>{user.preferences[3]}</p>
                        </div>
                    </>
                )}
            </div>
        </SmakCard>
    );
}
