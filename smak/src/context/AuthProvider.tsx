import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type User from "../interfaces/User";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "./AuthContext";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        refreshUser().finally(() => setLoading(false));
    }, []);

    const login = () => {
        // Implement login logic here
    }

    const logout = () => {
        setUser(null);
        navigate("/login");
    }

    const refreshUser = async () => {
        // Implement user refresh logic here
        }

    const value: AuthContextType = {
        user,
        loading,
        login,
        logout,
        refreshUser }

        return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

export default AuthProvider;