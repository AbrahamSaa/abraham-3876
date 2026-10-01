import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../interfaces/user.interface";
import { storage } from "@snail/shared";
import { SESSION } from "../services/authService";


type AuthStatus = "Authenticated" | "Unauthenticated" | "initial";

export interface AuthContextType {
    user: User | undefined;
    authStatus: AuthStatus;
    setLogin: (user: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [status, setStatus] = useState<AuthStatus>("initial");
    const [user, setUser] = useState<User | undefined>(undefined);

    const setLogin = (user: User) => {
        setUser(user);
        setStatus("Authenticated");
    };

    const logout = () => {
        storage.remove(SESSION);
        setStatus("Unauthenticated");
        setUser(undefined);

    }

    useEffect(() => {
        const user = storage.get<User>(SESSION);
        if (user !== null) {
            setLogin(user);
        } else {
            setStatus("Unauthenticated");
        }
    }, []);


    return (
        <AuthContext.Provider value={{
            authStatus: status,
            user: user,
            setLogin,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}