import React, { createContext, useContext, useState } from "react";

interface TripCountContextType {
  historyCount: number;
  setHistoryCount: (n: number) => void;
  comingCount: number;
  setComingCount: (n: number) => void;
}

const TripCountContext = createContext<TripCountContextType | undefined>(undefined);

export function useTripCount() {
  const ctx = useContext(TripCountContext);
  if (!ctx) throw new Error("useTripCount must be used within TripCountProvider");
  return ctx;
}

export function TripCountProvider({ children }: { children: React.ReactNode }) {
  const [historyCount, setHistoryCount] = useState(0);
  const [comingCount, setComingCount] = useState(0);

  return (
    <TripCountContext.Provider value={{ historyCount, setHistoryCount, comingCount, setComingCount }}>
      {children}
    </TripCountContext.Provider>
  );
}