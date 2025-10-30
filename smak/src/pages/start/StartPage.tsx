import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Row } from "react-bootstrap";
import { useDynamicMap } from "../../context/DynamicMapProvider";
import Start from "./Start";
import LoginOrRegister from "./LoginOrRegister";
import config from "../../config/Config";

export default function StartPage() {
  const { user, login } = useAuth();
  const { setTriggerLoginZoom } = useDynamicMap();
  const [showStart, setShowStart] = useState(true);
  const isLoggedIn = !!user;

  // Trigger animations when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => setTriggerLoginZoom(true), config.MapZoomAnimationDelay);
      setTimeout(() => setShowStart(true), config.StartComponentAnimationDelay);
      setTimeout(() => setTriggerLoginZoom(false), config.MapZoomAnimationDuration + 100);
    } else {
      setShowStart(false);
      setTriggerLoginZoom(false);
    }
  }, [isLoggedIn, setTriggerLoginZoom]);

  return (
    <div className="position-relative h-100 overflow-hidden">
      {isLoggedIn ? (
        <div className={`start-component ${!showStart ? "" : "fade-in"}`}>
          <Start />
        </div>
      ) : (
        <LoginOrRegister />
      )}

      <Row className="hide-watermarks left-watermark" />
      <Row className="hide-watermarks right-watermark" />
    </div >
  );
}