import { createContext } from "react";
import type User from "../interfaces/User";
import type { RegisterPayload } from "../interfaces/RegisterPayload";

export interface AuthContextType {
  user: User | null;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
