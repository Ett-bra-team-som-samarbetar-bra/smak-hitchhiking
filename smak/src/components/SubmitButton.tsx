import React from "react";
import { Button, Spinner } from "react-bootstrap";

interface SubmitButtonProps {
  isLoading: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function SubmitButton({ isLoading, children, className = "" }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className={`${className} btn btn-primary py-2 rounded-5 w-100`}
      disabled={isLoading} >
      {
        isLoading ? (
          <>
            <Spinner
              animation="grow"
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
