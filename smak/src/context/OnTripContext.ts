import { createContext } from "react";
import type Trip from "../interfaces/Trips";

export interface OnTripContextType {
  onTrip: boolean;
  currentTrip: Trip | null;
  refreshTripStatus: () => void;
}
export const OnTripContext = createContext<OnTripContextType | undefined>(
  undefined
);
