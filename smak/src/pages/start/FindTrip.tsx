import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDynamicMap } from "../../context/DynamicMapProvider";
import { useSmakTopAlert } from "../../context/SmakTopAlertProvider";
import SubmitButton from "../../components/SubmitButton";
import GeocodeInput from "../../components/inputForms/GeocodeInput";

export default function FindTrip() {
  const { from, setFrom, to, setTo, centerMapOnLocations } = useDynamicMap();
  const { showAlert } = useSmakTopAlert();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // TODO
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!from || !to) {
      console.log("Some fields empty");
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

  const handleOnCalenderClick = async () => {
    console.log("OnCalenderClick");
  };

  return (
    <div className="dynamic-map-ontop-content px-3 d-flex flex-column">
      <div className="d-flex flex-column">

        {/* Center self icon */}
        <div className="position-relative d-flex justify-content-end mb-2 ">
          <Button
            type="button"
            className="btn btn-light rounded-circle shadow d-flex justify-content-center align-items-center interactive"
            onClick={centerMapOnLocations}
            style={{ width: "40px", height: "40px" }}>
            <i className="bi bi-geo-alt-fill text-black fs-5 dynamic-map-center-icon"></i>
          </Button>
        </div>

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
