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
  const trackingInitialized = useRef(false);

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

  useEffect(() => {
    if (!user) {
      setCurrentTrip(null);
      trackingInitialized.current = false;
      return;
    }

    let active = true;
    const updateStatus = () => {
      if (active) computeTripStatus();
    };

    updateStatus();
    const interval = setInterval(computeTripStatus, 60 * 1000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [computeTripStatus, user]);

  useEffect(() => {
    const prevTrip = previousTripRef.current;

    if (trackingInitialized.current && prevTrip && !currentTrip && user) {
      navigate("/trips-done", { state: { completedTrip: prevTrip } });
    }

    previousTripRef.current = currentTrip;

    if (!trackingInitialized.current && (currentTrip || userTrips.length)) {
      trackingInitialized.current = true;
    }
  }, [currentTrip, navigate, user, userTrips]);

  useEffect(() => {
    previousTripRef.current = null;
    setCurrentTrip(null);
    trackingInitialized.current = false;
  }, [user?.id]);

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
