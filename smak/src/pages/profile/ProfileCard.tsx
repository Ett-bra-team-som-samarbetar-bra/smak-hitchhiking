import IconButton from "../../components/IconButton";
import type User from "../../interfaces/User";
import { renderRatingStars } from "../../utils/Utils";

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
      className={`bg-white rounded-2 w-100 shadow mb-3 card-div text-center profile-card px-5 pb-3 position-relative`}
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
          bg="bg-primary"
          className={`${isOwnProfile ? "edit-icon" : "add-icon"} text-white`}
        />
      </div>

      <h2 className="m-0">
        {user.firstName} {user.lastName}
      </h2>

      <div className="text-center mb-3 ">{renderRatingStars(user.rating)}</div>

      <div className="mb-4">
        <p className="text-center mb-1 text-secondary fst-italic">{user.description || ""}</p>
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