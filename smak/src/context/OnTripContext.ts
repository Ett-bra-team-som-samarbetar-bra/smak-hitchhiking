import { createContext } from "react";

export interface OnTripContextType {
    onTrip: boolean;
    setOnTrip: (value: boolean) => void;
}
export const OnTripContext = createContext<OnTripContextType | undefined>(undefined);