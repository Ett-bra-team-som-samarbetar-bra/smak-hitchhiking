import React from "react";
import { Button, Spinner } from "react-bootstrap";

interface SubmitButtonProps {
  isLoading: boolean;
  children?: React.ReactNode;
  className?: string;
  color?: string; // primary, secondary, success, danger, warning, info, light, dark
}

export default function SubmitButton({ isLoading, children, className = "", color = "primary" }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className={`${className} btn btn-${color} py-2 rounded-5 w-100 shadow`}
      disabled={isLoading}
      style={{ opacity: isLoading ? 0.96 : 1 }}>
      {
        isLoading ? (
          <>
            <Spinner
              animation="border"
              size="sm"
              role="status"
              variant="light"
            />
          </>
        ) : (
          children
        )
      }
    </Button >
  );
}
