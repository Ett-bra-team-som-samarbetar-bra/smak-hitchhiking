import { createContext } from 'react';
import type User from '../interfaces/User';

export interface AuthContextType {
    user: User | null;
    login: () => void;
    logout: () => void;
    loading: boolean;
    refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined >(undefined);