import { useState } from "react";
import type { ReactNode } from "react";
import { OnTripContext } from "./OnTripContext";
import type { OnTripContextType } from "./OnTripContext";

interface OnTripProviderProps {
    children: ReactNode;
}

const OnTripProvider = ({ children }: OnTripProviderProps) => {
    const [onTrip, setOnTrip] = useState<boolean>(false);


    const value: OnTripContextType = {
        onTrip,
        setOnTrip
    };
    return <OnTripContext.Provider value={value}>{children}</OnTripContext.Provider>;
}

export default OnTripProvider;