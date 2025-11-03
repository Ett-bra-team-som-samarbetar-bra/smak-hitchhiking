import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDynamicMap } from "../../context/DynamicMapProvider";
import { useSmakTopAlert } from "../../context/SmakTopAlertProvider";
import SubmitButton from "../../components/SubmitButton";
import GeocodeInput from "../../components/inputForms/GeocodeInput";
import SmakMapButton from "../../components/SmakMapButton";

export default function FindTrip() {
  const { from, setFrom, to, setTo, centerMapOnLocations } = useDynamicMap();
  const { showAlert } = useSmakTopAlert();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // TODO calender
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!from || !to) {
      showAlert({
        message: "Alla fält måste vara ifyllda.",
        backgroundColor: "warning",
        textColor: "white",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1400));
      navigate("/trips-found");

    } catch (error) {
      showAlert({
        message: "Ett fel uppstod vid sökningen av resor. Försök igen.",
        backgroundColor: "danger",
        textColor: "white",
        duration: 5000,
      });

    } finally {
      setIsLoading(false);
    }
  };

  const handleClearInputs = () => {
    setFrom(null);
    setTo(null);
  };

  const handleOnCalenderClick = async () => {
    console.log("OnCalenderClick");
  };

  return (
    <div className="dynamic-map-ontop-content px-3 d-flex flex-column">
      <div className="d-flex flex-column">

        {/* Buttons */}
        <SmakMapButton
          onClick={centerMapOnLocations}
          icon="bi-geo-alt-fill"
          iconClassName="fs-5 dynamic-map-home-icon"
        />
        <SmakMapButton
          onClick={handleClearInputs}
          icon="bi-x"
          iconClassName="fs-2 dynamic-map-cross-icon"
        />

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <GeocodeInput
            value={from}
            onChange={setFrom}
            placeholder="Från" />

          <GeocodeInput
            value={to}
            onChange={setTo}
            placeholder="Till" />

          <div className="position-relative interactive">
            <i className="bi bi-calendar-fill dynamic-map-input-icons fs-5" />
            <button
              type="button"
              className="btn bg-primary text-white border-0 rounded-5 py-2 dynamic-map-input-field w-100 text-start focus-no-outline"
              onClick={handleOnCalenderClick}>
              Avgång
            </button>
          </div>

          <SubmitButton
            isLoading={isLoading}
            className="mt-4 interactive"
            color={"primary"}>
            Sök resa
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
