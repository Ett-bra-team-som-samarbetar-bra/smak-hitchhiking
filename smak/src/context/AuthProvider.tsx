import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { AuthContextType } from "./AuthContext";
import type { RegisterPayload } from "../interfaces/RegisterPayload";
import type User from "../interfaces/User";
import config from "../config/Config";

interface AuthProviderProps {
  children: ReactNode;
}

const fakeUser: User = {
  id: "42",
  username: "Dev User",
  email: "dev@example.com",
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (config.fakeUserLoggedIn) {
      setUser(fakeUser);
      console.log("Using fake user");
      return;
    }

    refreshUser();
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
        throw new Error("Inlogg misslyckades");
      }

      // Dont touch my spaghetti
      const data = await response.json();
      await Promise.all([data, new Promise((res) => setTimeout(res, 1000))]);

      setTimeout(() => {
        setUser(data);
      }, 300);

    } catch (error) {
      setUser(null);
      throw new Error("Inlogg misslyckades");
    }
  };

  const register = async (payload: RegisterPayload) => {
    payload.userName = payload.firstName + payload.email.replace(/@/g, "");

    try {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Registrering misslyckades");
      }

      const registerResponse = await response.json();
      await Promise.all([registerResponse, new Promise((res) => setTimeout(res, 1000))]);

    } catch (error) {
      throw new Error(String(error));
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

  const value: AuthContextType = { user, login, logout, refreshUser, register };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
