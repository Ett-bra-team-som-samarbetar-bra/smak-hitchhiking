import React from "react";
import { Button } from "react-bootstrap";

interface SmakButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
    color?: string; 
}

export default function SmakButton({ onClick, children, className = "", color = "primary" }: SmakButtonProps) {
    return (
        <Button
            type="submit"
            className={`${className} btn btn-${color} py-2 rounded-5 w-100 shadow`}
            onClick={onClick}
        >
            {children}
        </Button >
    );
}
