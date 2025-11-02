import { Alert } from "react-bootstrap";

interface SmakTopAlertProps {
  show: boolean;
  children: React.ReactNode;
  backgroundColor: string; // "success", "danger", "warning"
  textColor: string;
  className?: string;
}

export default function SmakTopAlert({
  show,
  children,
  backgroundColor,
  textColor,
  className = "",
}: SmakTopAlertProps) {
  return (
    <Alert className={`bg-${backgroundColor} border-0 text-center text-${textColor} smak-top-alert${show ? " visible" : ""} ${className}`}>
      {children}
    </Alert>
  );
}
