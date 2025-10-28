import { useEffect, useState } from "react";
import type GeocodeSelection from "../../interfaces/GeocodeSelection";
import DynamicMap from "../../partials/DynamicMap";
import Start from "./Start";
import Login from "./Login";
import { useAuth } from "../../hooks/useAuth";
import config from "../../config/Config";

export default function StartPage() {
  const { user, login } = useAuth();
  const [shouldCenterOnFrom, setShouldCenterOnFrom] = useState(false);
  const [from, setFrom] = useState<GeocodeSelection | null>(null);
  const [to, setTo] = useState<GeocodeSelection | null>(null);
  const [showStart, setShowStart] = useState(false);
  const isLoggedIn = !!user;

  const handleCenterMap = () => {
    setShouldCenterOnFrom(true);
    setTimeout(() => setShouldCenterOnFrom(false), 100);
  };

  const handleLogin = async () => {
    await login("", "");
  };

  // Trigger Start component animation
  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => setShowStart(true), config.StartComponentAnimationDelay);
    } else {
      setShowStart(false);
    }
  }, [user]);

  return (
    <div className="position-relative h-100 overflow-hidden">
      <div className="dynamic-map-container">
        <DynamicMap
          from={from}
          to={to}
          centerOnFrom={shouldCenterOnFrom}
          isLoginPage={!isLoggedIn} />
      </div>

      {isLoggedIn ? (
        <div className={`start-component ${showStart ? "fade-in" : ""}`}>
          <Start
            from={from}
            setFrom={setFrom}
            to={to}
            setTo={setTo}
            onCenterSelf={handleCenterMap} />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div >
  );
}