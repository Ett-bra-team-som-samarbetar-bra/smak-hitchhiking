import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type User from "../interfaces/User";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "./AuthContext";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  const login = async (usernameOrEmail: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usernameOrEmail: usernameOrEmail,
          password: password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        setUser(null);
        throw new Error("Login failed");
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Login failed:", error);
      setUser(null);
    }
  };

  const logout = async () => {
    await fetch(`${BASE_URL}api/OrchardCore.Users.Account/LogOff`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate("/login");
  };

  const refreshUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}api/auth/login`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        setUser(null);
        return;
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      setUser(null);
      console.error("Failed to refresh user:", error);
    }
  };

  const value: AuthContextType = { user, loading, login, logout, refreshUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
