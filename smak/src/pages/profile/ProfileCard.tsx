import { Button, Card } from "react-bootstrap";

export default function ProfileCard({ user, isOwnProfile = true, }: {
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
}) {
    return (
      
        <Card className="mt-5 w-100 text-center bg-white border-0 profile-card px-5 pb-5 ">
            <div className="profile-image-container">
                <img src={user.profileImage} alt="Profile" className="profile-image" />

                {isOwnProfile ? (
                    <Button 
                    className="bi bi-pencil-fill edit-icon d-flex justify-content-center align-items-center border-0 shadow bg-white rounded-circle text-black"
                    onClick={() => console.log("Edit")} />
                    
                ) : (
                    <Button className="bi bi-person-add add-icon d-flex justify-content-center align-items-center border-0 shadow bg-white rounded-circle text-black"
                    onClick={() => console.log("Add friend")} />
                )}
            </div>

            <h2>{user.firstName} {user.lastName}</h2>

            <div className="d-flex justify-content-between mt-2 mb-4">
                <div className="text-center">
                    <p className="mb-1 fw-bold">{user.trips}</p>
                    <p className="mb-0 text-black-50">Trips</p>
                </div>

                <div className="text-center">
                    <p className="mb-1 fw-bold">{user.rating}/5</p>
                    <p className="mb-0 text-black-50">Rating</p>
                </div>

                <div className="text-center">
                    <p className="mb-1 fw-bold">{user.activeYears}</p>
                    <p className="mb-0 text-black-50">Active</p>
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
        </Card>
    );
}
