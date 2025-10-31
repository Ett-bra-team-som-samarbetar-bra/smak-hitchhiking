import { useNavigate } from "react-router-dom";
import SmakContact from "../../components/SmakContact";
import { getMockUsers } from "../../utils/MockData";

export default function ContactPage() {

  const navigate = useNavigate();

  const handleUserClick = (user: any) => {
    navigate(`/profile/${user.id}`, { state: { user } });
  };

  return (
    <div className="d-flex flex-column gap-3">
      <h2 className="m-0">Dina Kontakter</h2>

      {getMockUsers().map((user, index) => (
        <SmakContact key={index} user={user} onClick={() => handleUserClick(user)} />
      ))}
    </div>
  )
}
