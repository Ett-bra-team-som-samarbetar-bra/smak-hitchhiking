import { useState } from "react";
import DynamicMap from "../../partials/DynamicMap";
import type GeocodeSelection from "../../interfaces/GeocodeSelection";
import SubmitButton from "../../components/SubmitButton";
import { Button } from "react-bootstrap";

export default function StartPage() {
  const [from, setFrom] = useState<GeocodeSelection | null>(null);
  const [to, setTo] = useState<GeocodeSelection | null>(null);

  /* const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to) {
      console.log("Selected route:", from, "->", to);
    }
  }; */

  return (
    <div className="position-relative h-100 overflow-hidden">
      <div className="dynamic-map-container">
        <DynamicMap
          from={from}
          to={to} />
      </div>

      <div className="dynamic-map-ontop-content px-3 d-flex flex-column">
        <div className="d-flex flex-column mb-4">

          {/* Center self icon */}
          <div className="position-relative d-flex justify-content-end mb-3">
            <Button
              type="button"
              className="btn btn-light rounded-circle shadow d-flex justify-content-center"
              onClick={() => console.log("Center self ba")}
              style={{ width: "38px", height: "38px" }}>
              <i className="bi bi-cursor-fill text-black fs-6"></i>
            </Button>
          </div>

          {/* Till */}
          <div className="position-relative mb-1">
            <i className="bi bi-geo-alt-fill dynamic-map-input-icons fs-5" />
            <input
              type="text"
              className="form-control bg-primary text-white border-0 rounded-5 py-2 dynamic-map-input-field focus-no-outline"
              placeholder="Till" />
          </div>

          {/* Swap icon */}
          <div className="d-flex justify-content-center dynamic-map-swap-container">
            <Button
              type="button"
              className="btn btn-light rounded-circle shadow d-flex align-items-center justify-content-center"
              onClick={() => console.log("Swap locations ba")}
              style={{ width: "38px", height: "38px" }}>
              <i className="bi bi-arrow-down-up text-black fs-6"></i>
            </Button>
          </div>

          {/* Från */}
          <div className="position-relative mb-1">
            <i className="bi bi-geo-alt-fill dynamic-map-input-icons fs-5" />
            <input
              type="text"
              className="form-control bg-primary text-white border-0 rounded-5 py-2 dynamic-map-input-field focus-no-outline"
              placeholder="Från" />
          </div>

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
        </div>

        <SubmitButton
          isLoading={false}
          className=""
          onClick={() => console.log("Hitta Resa Clicked")}>
          Hitta Resa
        </SubmitButton>
      </div>





      {/* <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center">
        <GeocodeInput value={from} onChange={setFrom} placeholder="From" />
        <GeocodeInput value={to} onChange={setTo} placeholder="To" />
        <button type="submit" className="btn btn-primary">
          Hitta resor
        </button>
      </form> */}


    </div >
  );
}
