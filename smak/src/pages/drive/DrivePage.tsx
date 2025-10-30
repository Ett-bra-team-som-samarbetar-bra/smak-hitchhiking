import { useState } from "react";
import { useDynamicMap } from "../../context/DynamicMapProvider";
import { Button } from "react-bootstrap";
import GeocodeInput from "../../components/inputForms/GeocodeInput";
import SubmitButton from "../../components/SubmitButton";

export default function DrivePage() {
  const { from, setFrom, to, setTo, centerMapOnLocations } = useDynamicMap();
  const [isLoading, setIsLoading] = useState(false);

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
      console.log("success");
      alert("Resa skapad!");
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnCarClick = async () => {
    console.log("OnCarClick");
  };

  const handleOnCalenderClick = async () => {
    console.log("OnCalenderClick");
  };

  return (
    <div className="position-relative h-100 z-index-fix non-interactive">
      <div className="dynamic-map-ontop-content px-3 d-flex flex-column">
        <div className="d-flex flex-column">

          {/* Center self icon */}
          <div className="position-relative d-flex justify-content-end mb-2">
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
            <div className="position-relative mb-1">
              <i className="bi bi-car-front-fill dynamic-map-input-icons fs-5" />
              <Button
                className="btn bg-primary text-white border-0 rounded-5 py-2 dynamic-map-input-field w-100 text-start focus-no-outline interactive"
                onClick={handleOnCarClick}>
                Fordon
              </Button>
            </div>

            <GeocodeInput
              value={from}
              onChange={setFrom}
              placeholder="Från" />

            <GeocodeInput
              value={to}
              onChange={setTo}
              placeholder="Till" />

            <div className="position-relative">
              <i className="bi bi-calendar-fill dynamic-map-input-icons fs-5" />
              <Button
                className="btn bg-primary text-white border-0 rounded-5 py-2 dynamic-map-input-field w-100 text-start focus-no-outline interactive"
                onClick={handleOnCalenderClick}>
                Avgång
              </Button>
            </div>

            <SubmitButton
              isLoading={isLoading}
              className="mt-4 interactive"
              color={"primary"}>
              Skapa Resa
            </SubmitButton>
          </form>
        </div>
      </div>
    </div >
  )
}
