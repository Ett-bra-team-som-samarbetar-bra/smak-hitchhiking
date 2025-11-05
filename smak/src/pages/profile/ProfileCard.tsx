import IconButton from "../../components/IconButton";
import type User from "../../interfaces/User";

interface ProfileCardProps {
  user: User;
  profileImage: string | undefined;
  isOwnProfile?: boolean;
  isAlreadyFriend?: boolean;
  onEdit?: () => void;
  onAddFriend?: () => void;
  onRemoveFriend?: () => void;
}

export default function ProfileCard({
  user,
  profileImage,
  isOwnProfile = true,
  isAlreadyFriend = false,
  onEdit,
  onAddFriend,
  onRemoveFriend,
}: ProfileCardProps) {
  return (
    <div
      className={`bg-white rounded-2 w-100 shadow mb-3 card-div text-center profile-card px-5 pb-5 position-relative`}
    >
      <div className="profile-image-container">
        <img
          src={profileImage}
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
            else if (isAlreadyFriend && onRemoveFriend) onRemoveFriend();
            else if (onAddFriend) onAddFriend();
          }}
          className={`${isOwnProfile ? "edit-icon" : "add-icon"}`}
        />
      </div>

      <h2>
        {user.firstName} {user.lastName}
      </h2>

      <div className="d-flex justify-content-between mt-2 mb-4">
        <div className="text-center">
          <p className="mb-1 fw-bold">{user.tripCount || 0}</p>
          <p className="mb-0 text-black-50">Rutter</p>
        </div>

        <div className="text-center">
          <p className="mb-1 fw-bold">{user.rating || 0}/5</p>
          <p className="mb-0 text-black-50">Betyg</p>
        </div>

        <div className="text-center"> {/* Years Active */}
          <p className="mb-1 fw-bold">{user.tripCount || 0}</p>
          <p className="mb-0 text-black-50">År</p>
        </div>
      </div>

      <div className="d-flex align-items-center mb-2">
        <div className="flex-grow-1 border-bottom"></div>
        <span className="mx-3 text-nowrap">Preferenser</span>
        <div className="flex-grow-1 border-bottom"></div>
      </div>

      <div className="d-flex flex-column mt-2">
        {user.preferences! && user.preferences!.length > 0 && (
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