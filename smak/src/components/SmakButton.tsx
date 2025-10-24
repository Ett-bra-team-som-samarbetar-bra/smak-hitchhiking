import React from "react";
import { Button } from "react-bootstrap";

interface SmakButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
    color?: string;
    rounded?: string;
}

export default function SmakButton({ onClick, children, className = "", color = "primary", rounded = "rounded-5" }: SmakButtonProps) {
    return (
        <Button
            type="button"
            className={`${className} btn btn-${color} py-2 ${rounded} w-100`}
            onClick={onClick}
        >
            {children}
        </Button >
    );
}
