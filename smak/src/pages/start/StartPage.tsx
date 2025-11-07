import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDynamicMap } from "../../context/DynamicMapProvider";
import InputFindTrip from "./InputFindTrip";
import LoginOrRegister from "./LoginOrRegister";
import config from "../../config/Config";
import useOnTrip from "../../hooks/useOnTrip";

export default function StartPage() {
  const { user } = useAuth();
  const { onTrip } = useOnTrip();
  const { setTriggerLoginZoom, resetMap, hasLoginAnimationCompleted } = useDynamicMap();
  const [showStart, setShowStart] = useState(true);

  const navigate = useNavigate();
  const isLoggedIn = !!user;

  // Goto current trips page if ongoing
  useEffect(() => {
    if (isLoggedIn && onTrip) {
      navigate("/trips-current", { replace: true });
    }
  }, [isLoggedIn, onTrip, navigate]);

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
          <InputFindTrip />
        </div>
      ) : (
        <LoginOrRegister />
      )}

      <Row className="hide-watermarks left-watermark" />
      <Row className="hide-watermarks right-watermark" />
    </div>
  );
}
