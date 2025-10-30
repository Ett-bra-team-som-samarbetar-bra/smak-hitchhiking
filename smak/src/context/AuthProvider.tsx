import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import type { ReactNode } from "react";
import type { AuthContextType } from "./AuthContext";
import type User from "../interfaces/User";
import config from "../config/Config";

interface AuthProviderProps {
  children: ReactNode;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const fakeUser: User = {
  id: "42",
  username: "Dev User",
  email: "dev@example.com",
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (config.fakeUserLoggedIn) {
      setUser(fakeUser);
      setLoading(false);
      console.log("Using fake user, skipping refresh.");
      return;
    }

    refreshUser().finally(() => setLoading(false));
  }, []);

  const login = async (usernameOrEmail: string, password: string) => {
    if (config.fakeUserEnabled) {
      setUser(fakeUser);
      return;
    }

    try {
      const response = await fetch(`/api/auth/login`, {
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
      throw new Error("Login failed");
    }
  };

  const logout = async () => {
    if (config.fakeUserEnabled) {
      setUser(null);
      return;
    }

    await fetch(`/api/auth/login`, {
      method: "DELETE",
      credentials: "include",
    });
    setUser(null);
    navigate("/login");
  };

  const refreshUser = async () => {
    if (config.fakeUserEnabled) {
      return;
    }

    try {
      const response = await fetch(`api/auth/login`, {
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
