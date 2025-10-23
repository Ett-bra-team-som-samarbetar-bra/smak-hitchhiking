import { useState } from "react";
import DynamicMap from "../../partials/DynamicMap";
import GeocodeInput from "../../utils/GeocodeInput";
import type GeocodeSelection from "../../interfaces/GeocodeSelection";

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
    <div className="d-flex flex-column">

      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center">
        <GeocodeInput value={from} onChange={setFrom} placeholder="From" />
        <GeocodeInput value={to} onChange={setTo} placeholder="To" />
        <button type="submit" className="btn btn-primary">
          Hitta resor
        </button>
      </form>


      <DynamicMap
        className="d-flex flex-grow-1"
        from={from}
        to={to}
      >

      </DynamicMap>
    </div>
  );
}
