import { useState } from "react";
import { Button } from "react-bootstrap";
import type GeocodeSelection from "../../interfaces/GeocodeSelection";
import DynamicMap from "../../partials/DynamicMap";
import SubmitButton from "../../components/SubmitButton";
import GeocodeInput from "../../utils/GeocodeInput";

export default function StartPage() {
  const [from, setFrom] = useState<GeocodeSelection | null>(null);
  const [to, setTo] = useState<GeocodeSelection | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!from || !to) {
      console.log("Some fields empty");
      return;
    }

    setIsLoading(true);

    // Todo
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("success");
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="position-relative h-100 overflow-hidden">
      <div className="dynamic-map-container">
        <DynamicMap
          from={from}
          to={to} />
      </div>

      <div className="dynamic-map-ontop-content px-3 d-flex flex-column">
        <div className="d-flex flex-column">

          {/* Center self icon */}
          <div className="position-relative d-flex justify-content-end mb-3">
            <Button
              type="button"
              className="btn btn-light rounded-circle shadow d-flex justify-content-center align-items-center"
              onClick={() => console.log("Center self ba")}
              style={{ width: "38px", height: "38px" }}>
              <i className="bi bi-cursor-fill text-black fs-5 dynamic-map-center-icon"></i>
            </Button>
          </div>

          {/* Swap icon */}
          <div className="d-flex justify-content-center dynamic-map-swap-container">
            <Button
              type="button"
              className="btn btn-light rounded-circle shadow d-flex align-items-center justify-content-center"
              onClick={() => console.log("Swap locations ba")}
              style={{ width: "38px", height: "38px" }}>
              <i className="bi bi-arrow-down-up text-black fs-5 dynamic-map-swap-icon"></i>
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <GeocodeInput
              value={from}
              onChange={setFrom}
              placeholder="Från" />

            <GeocodeInput
              value={to}
              onChange={setTo}
              placeholder="Till" />

            {/* Hitta Resa */}
            <div className="position-relative">
              <i className="bi bi-calendar-fill dynamic-map-input-icons fs-5" />
              <button
                type="button"
                className="btn bg-primary text-white border-0 rounded-5 py-2 dynamic-map-input-field w-100 text-start focus-no-outline"
                onClick={() => console.log("Open calendar clicked")}>
                Avgång
              </button>
            </div>

            <SubmitButton
              isLoading={isLoading}
              className="mt-4">
              Hitta Resa
            </SubmitButton>
          </form>
        </div>
      </div>
    </div >
  );
}






{/* <form
    onSubmit={handleSubmit}
    className="d-flex flex-column align-items-center">
    <GeocodeInput value={from} onChange={setFrom} placeholder="From" />
    <GeocodeInput value={to} onChange={setTo} placeholder="To" />
    <button type="submit" className="btn btn-primary">
      Hitta resor
    </button>
  </form> */}