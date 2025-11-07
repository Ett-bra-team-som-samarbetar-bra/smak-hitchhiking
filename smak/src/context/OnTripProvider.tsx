import { useCallback, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { OnTripContext } from "./OnTripContext";
import type { OnTripContextType } from "./OnTripContext";
import { useAuth } from "../hooks/useAuth";
import useUserTrips from "../hooks/useUserTrips";
import useAllTrips from "../hooks/useAllTrips";
import type Trip from "../interfaces/Trips";

interface OnTripProviderProps {
  children: ReactNode;
}

const OnTripProvider = ({ children }: OnTripProviderProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const allTrips = useAllTrips();
  const userTrips = useUserTrips(user?.id || "", allTrips);

  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const previousTripRef = useRef<Trip | null>(null);

  // Detect if trip is ongoing based on time
  const computeTripStatus = useCallback(() => {
    if (!user || !userTrips.length) {
      setCurrentTrip(null);
      return;
    }

    const now = new Date();

    const active = userTrips.find((trip) => {
      if (!trip.departureTime || !trip.arrivalTime) return false;
      const dep = new Date(trip.departureTime);
      const arr = new Date(trip.arrivalTime);
      return now >= dep && now <= arr;
    });

    setCurrentTrip(active || null);
  }, [user, userTrips]);

  // Check once per minute for active trip
  useEffect(() => {
    if (!user) {
      setCurrentTrip(null);
      return;
    }

    computeTripStatus(); // run immediately

    const interval = setInterval(computeTripStatus, 60 * 1000);
    return () => clearInterval(interval);
  }, [computeTripStatus, user]);

  // Navigate when trip is over
  useEffect(() => {
    if (!currentTrip) return;

    const checkIfTripEnded = () => {
      const now = new Date();
      const arrival = new Date(currentTrip.arrivalTime);
      if (now > arrival) {
        navigate("/trips-done", { state: { completedTrip: currentTrip } });
        previousTripRef.current = null;
        setCurrentTrip(null);
      }
    };

    const interval = setInterval(checkIfTripEnded, 15 * 1000); // check every 15s
    return () => clearInterval(interval);
  }, [currentTrip, navigate]);

  // Reset with user logout
  useEffect(() => {
    previousTripRef.current = null;
    setCurrentTrip(null);
  }, [user?.id]);

  // 🔹 5. Provide context value
  const value: OnTripContextType = {
    onTrip: !!currentTrip,
    currentTrip,
    refreshTripStatus: computeTripStatus,
  };

  return (
    <OnTripContext.Provider value={value}>{children}</OnTripContext.Provider>
  );
};

export default OnTripProvider;
