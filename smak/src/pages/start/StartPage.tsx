import { useState } from "react";
import type GeocodeSelection from "../../interfaces/GeocodeSelection";
import DynamicMap from "../../partials/DynamicMap";
import Start from "./Start";
import Login from "./Login";
import { useAuth } from "../../hooks/useAuth";

export default function StartPage() {
  const [shouldCenterOnFrom, setShouldCenterOnFrom] = useState(false);
  const [from, setFrom] = useState<GeocodeSelection | null>(null);
  const [to, setTo] = useState<GeocodeSelection | null>(null);


  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // todo 

  const handleCenterSelf = () => {
    setShouldCenterOnFrom(true);
    setTimeout(() => setShouldCenterOnFrom(false), 100);
  };

  return (
    <div className="position-relative h-100 overflow-hidden">
      <div className="dynamic-map-container">
        <DynamicMap
          from={from}
          to={to}
          centerOnFrom={shouldCenterOnFrom}
          isLoginPage={!isUserLoggedIn} />
      </div>

      {isUserLoggedIn ? (
        <Start
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
          onCenterSelf={handleCenterSelf}
        />
      ) : (
        <Login />
      )}
    </div >
  );
}
