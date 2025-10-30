import IconButton from "../../components/IconButton";

interface ProfileCardProps {
  user: {
    firstName: string | undefined;
    lastName: string | undefined;
    profileImage: string | undefined;
    trips: number | undefined;
    rating: string | undefined;
    activeYears: string | undefined;
    preferences: string[] | undefined;
  };
  isOwnProfile?: boolean;
  isAlreadyFriend?: boolean;
  onEdit?: () => void;
}

export default function ProfileCard({
  user,
  isOwnProfile = true,
  isAlreadyFriend = false,
  onEdit,
}: ProfileCardProps) {
  return (
    <div
      className={`bg-white rounded-2 w-100 shadow mb-3 card-div text-center profile-card px-5 pb-5 position-relative`}
    >
      <div className="profile-image-container">
        <img
          src={user.profileImage}
          alt="Profile"
          className="profile-image shadow"
        />

        <IconButton
          icon={
            isOwnProfile
              ? "bi-pencil-fill"
              : isAlreadyFriend
              ? "bi-trash"
              : "bi-person-add"
          }
          onClick={() => {
            if (isOwnProfile && onEdit) onEdit();
            else if (isAlreadyFriend) console.log("Remove friend");
            else console.log("Add friend");
          }}
          className={`${isOwnProfile ? "edit-icon" : "add-icon"}`}
        />
      </div>

      <h2>
        {user.firstName} {user.lastName}
      </h2>

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

      <div className="d-inline-flex flex-row align-items-center justify-content-center gap-2 my-2 border-bottom border-black w-100">
        <i className="bi bi-rocket-takeoff-fill"></i>
        <p className="my-2">Jag gillar</p>
      </div>

      <div className="d-flex flex-column mt-2">
        {user.preferences!.length > 0 && (
          <>
            <div className="d-flex justify-content-between gap-2">
              <p>{user.preferences![0]}</p>
              <p>{user.preferences![1]}</p>
            </div>
            <div className="d-flex justify-content-between gap-2">
              <p>{user.preferences![2]}</p>
              <p>{user.preferences![3]}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
