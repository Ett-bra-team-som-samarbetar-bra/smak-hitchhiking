import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Row } from "react-bootstrap";
import type GeocodeSelection from "../../interfaces/GeocodeSelection";
import DynamicMap from "../../partials/DynamicMap";
import Start from "./Start";
import Login from "./Login";
import config from "../../config/Config";

export default function StartPage() {
  const { user, login } = useAuth();
  const [shouldCenterOnFrom, setShouldCenterOnFrom] = useState(false);
  const [from, setFrom] = useState<GeocodeSelection | null>(null);
  const [to, setTo] = useState<GeocodeSelection | null>(null);
  const [showStart, setShowStart] = useState(false);
  const [triggerMapZoom, setTriggerMapZoom] = useState(false);
  const isLoggedIn = !!user;

  const handleCenterMap = () => {
    setShouldCenterOnFrom(true);
    setTimeout(() => setShouldCenterOnFrom(false), 100);
  };

  const handleLogin = async () => {
    await login("", "");
  };

  // Trigger animations when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => setTriggerMapZoom(true), config.MapZoomAnimationDelay);
      setTimeout(() => setShowStart(true), config.StartComponentAnimationDelay);
      setTimeout(() => setTriggerMapZoom(false), config.MapZoomDuration + 100);
    } else {
      setShowStart(false);
      setTriggerMapZoom(false);
    }
  }, [user]);

  return (
    <div className="position-relative h-100 overflow-hidden">
      <div className="dynamic-map-container">
        <DynamicMap
          from={from}
          to={to}
          centerOnFrom={shouldCenterOnFrom}
          isLoginPage={!isLoggedIn}
          triggerLoginZoom={triggerMapZoom} />
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

      <Row className="hide-watermarks left-watermark" />
      <Row className="hide-watermarks right-watermark" />
    </div >
  );
}