import { Alert } from "react-bootstrap";

// DO NOT USE
// Use "const { showAlert } = useSmakTopAlert();" instead!

interface SmakTopAlertProps {
  show: boolean;
  children: React.ReactNode;
  backgroundColor: string;
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
    <Alert className={`bg-${backgroundColor} border-0 text-center text-${textColor} smak-top-alert${show ? " visible" : ""} ${className} non-interactive`}>
      {children}
    </Alert>
  );
}
