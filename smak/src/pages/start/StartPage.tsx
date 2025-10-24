import { useState } from "react";
import DynamicMap from "../../partials/DynamicMap";
import GeocodeInput from "../../utils/GeocodeInput";
import type GeocodeSelection from "../../interfaces/GeocodeSelection";
import TripCardSmall from "../../components/trip/TripCardSmall";

export default function StartPage() {
  const [from, setFrom] = useState<GeocodeSelection | null>(null);
  const [to, setTo] = useState<GeocodeSelection | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to) {
      console.log("Selected route:", from, "->", to);
    }
  };

  return (
    <div className="position-relative h-100 overflow-hidden">
      <div className="dynamic-map-container">
        <DynamicMap
          className=""
          from={from}
          to={to} />
      </div>

      <div className="ontop-content w-100 d-flex">


        <TripCardSmall
          className="mx-3"
          firstName="Some"
          lastName="Bottons"
          userImage="/images/development/user2.png"
          startTime="Botton"
          endTime="Botton"
          startCity="Botton"
          endCity="Botton"
          rating={2}
          distance={420}
          onSmallTripCardClick={() => console.log("small card clicked")} />
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






      {/* <DynamicMap
        className="d-flex flex-grow-1"
        from={from}
        to={to}>
      </DynamicMap> */}
    </div>
  );
}
