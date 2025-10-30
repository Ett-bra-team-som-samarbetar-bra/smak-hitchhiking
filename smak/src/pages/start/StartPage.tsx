import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Row } from "react-bootstrap";
import { useDynamicMap } from "../../context/DynamicMapProvider";
import FindTrip from "./FindTrip";
import LoginOrRegister from "./LoginOrRegister";
import config from "../../config/Config";

export default function StartPage() {
  const { user } = useAuth();
  const { setTriggerLoginZoom, resetMap, hasLoginAnimationCompleted } = useDynamicMap();
  const [showStart, setShowStart] = useState(true);
  const isLoggedIn = !!user;

  // Trigger animations when user logs in
  useEffect(() => {
    if (isLoggedIn && !hasLoginAnimationCompleted) {
      setTimeout(() => setTriggerLoginZoom(true), config.MapZoomAnimationDelay);
      setTimeout(() => setShowStart(true), config.StartComponentAnimationDelay);
    } else if (!isLoggedIn) {
      resetMap();
      setShowStart(false);
    }
  }, [isLoggedIn, setTriggerLoginZoom, hasLoginAnimationCompleted]);

  return (
    <div className="position-relative h-100 z-index-fix non-interactive">
      {isLoggedIn ? (
        <div className={`find-trip ${showStart ? "fade-in" : ""}`}>
          <FindTrip />
        </div>
      ) : (
        <LoginOrRegister />
      )}

      <Row className="hide-watermarks left-watermark" />
      <Row className="hide-watermarks right-watermark" />
    </div>
  );
}
