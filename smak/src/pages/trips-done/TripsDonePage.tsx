import { useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import TripCardBig from "../../components/trip/TripCardBig";
import SmakContact from "../../components/SmakContact";
import type User from "../../interfaces/User";
import DividerLine from "../../components/DividerLine";
import { useAuth } from "../../hooks/useAuth";
import type Trip from "../../interfaces/Trips";
import useFetchPassengers from "../../hooks/useFetchPassengers";
import useFetchUser from "../../hooks/useFetchUser";

export default function TripsDonePage() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const completedTrip = (location.state as { completedTrip?: Trip })
    ?.completedTrip;

  if (!completedTrip) {
    return <p>Laddar...</p>;
  }
  const driver = useFetchUser(completedTrip.driver[0].id);
  const passengers = useFetchPassengers(completedTrip?.id);
  const currentUserId = user!.id;

  const participants: User[] = useMemo(() => {
    // passengers may be undefined while loading
    const all = [driver, ...(passengers ?? [])].filter(Boolean) as User[];

    // filter out the current user
    return all.filter((u) => u.id !== currentUserId);
  }, [driver, passengers, currentUserId]);

  const [isRated, setIsRated] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  if (!user)
    return <p className="text-center text-muted">Ingen användare inloggad.</p>;

  if (!completedTrip)
    return <p className="text-center text-muted">Inga resor hittades.</p>;

  const handleUserClick = (user: User) => {
    navigate(`/profile/${user.id}`, { state: { user } });
  };

  const handleRatingSubmit = async (newRating: number) => {
    if (passengers.length === 0) return;

    setSelectedRating(newRating);

    try {
      // Rate all except current user
      await Promise.all(
        participants.map((user) =>
          fetch(`/api/auth/user/${user.id}/rating`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Rating: newRating }),
          })
        )
      );

      setIsRated(true);
    } catch (error) { }
  };

  if (isRated) {
    return (
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <h1>Tack för din betygsättning! </h1>
        <p>Vi har uppdaterat betyg för alla som deltog i resan.</p>
      </div>
    );
  }

  if (!driver) {
    return <div>Laddar...</div>;
  }

  return (
    <>
      <div className="my-4">
        <h1 className="text-center">Betygsätt resan</h1>
        <div className="d-flex gap-3 justify-content-center mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingSubmit(star)}
              style={{
                fontSize: "2.5rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: selectedRating >= star ? "#FFD700" : "#ccc",
              }}
            >
              <i
                className={`bi bi-star${selectedRating >= star ? "-fill" : ""}`}
              />
            </button>
          ))}
        </div>
      </div>
      <DividerLine className="mb-4"></DividerLine>

      <h3>Förare</h3>
      <TripCardBig
        trip={completedTrip}
        onUserClick={() => handleUserClick(driver)}
      />

      {passengers.length > 0 && (
        <div className="d-flex flex-column gap-3" style={{ marginTop: "30px" }}>
          <h3 className="mb-3">Resenärer</h3>

          {passengers.map((user) => (
            <SmakContact
              key={user.id}
              user={{
                id: user.id,
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                rating: user.rating || "0",
                description: user.description || "",
              }}
              isDriver={false}
              isAddedToTrip={true}
              onClick={() => handleUserClick(user)}
            />
          ))}
        </div>
      )}
    </>
  );
}
