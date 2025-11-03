import { createContext, useContext, useState, useRef, type ReactNode } from "react";
import SmakTopAlert from "../components/SmakTopAlert";

type AlertType = "success" | "danger" | "warning";

interface SmakTopAlertContextType {
  showAlert: (options: {
    message: ReactNode;
    backgroundColor?: AlertType;
    textColor?: string;
    duration?: number;
    className?: string;
  }) => void;
}

const SmakTopAlertContext = createContext<SmakTopAlertContextType | undefined>(undefined);

export function useSmakTopAlert() {
  const ctx = useContext(SmakTopAlertContext);
  if (!ctx) throw new Error("useSmakTopAlert must be used within SmakTopAlertProvider");
  return ctx;
}

export function SmakTopAlertProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<ReactNode>(null);
  const [backgroundColor, setBackgroundColor] = useState<AlertType>("success");
  const [textColor, setTextColor] = useState<string>("white");
  const [className, setClassName] = useState<string>("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showAlert = ({
    message,
    backgroundColor = "success",
    textColor = "white",
    duration = 7000,
    className = "",
  }: {
    message: ReactNode;
    backgroundColor?: AlertType;
    textColor?: string;
    duration?: number;
    className?: string;
  }) => {
    setMessage(message);
    setBackgroundColor(backgroundColor);
    setTextColor(textColor);
    setClassName(className);
    setShow(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShow(false), duration);
  };

  return (
    <SmakTopAlertContext.Provider value={{ showAlert }}>
      <SmakTopAlert
        show={show}
        backgroundColor={backgroundColor}
        textColor={textColor}
        className={className}>
        {message}
      </SmakTopAlert>
      {children}
    </SmakTopAlertContext.Provider>
  );
}