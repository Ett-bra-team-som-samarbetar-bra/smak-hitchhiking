import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import config from "../config/Config";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user } = useAuth();

    // Dev override
    if (config.fakeUserEnabled) {
        return <>{children}</>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
