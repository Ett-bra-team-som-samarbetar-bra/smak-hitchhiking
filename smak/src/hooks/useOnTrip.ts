import { useContext } from "react";
import { OnTripContext } from "../context/OnTripContext";
export default function useOnTrip() {
  const context = useContext(OnTripContext);
  if (!context) {
    throw new Error("useOntrip must be used within an OntripProvider");
  }
  return context;
}
