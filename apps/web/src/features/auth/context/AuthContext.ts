import { createContext } from "react";
import type { SessionUser } from "../interfaces/user.interface";

export type AuthStatus = "initial" | "authenticated" | "unauthenticated";

export interface AuthContextType {
    user: SessionUser | undefined;
    authStatus: AuthStatus;
    setLogin: (user: SessionUser) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
