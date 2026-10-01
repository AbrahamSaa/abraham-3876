import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { SessionUser } from "../interfaces/user.interface";
import { AuthContext, type AuthStatus } from "./AuthContext";
import { clearSession, getStoredSession } from "../services/authService";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    // localStorage is synchronous, so the session can be restored on the first render.
    const [session] = useState(getStoredSession);
    const [authStatus, setAuthStatus] = useState<AuthStatus>(session ? "authenticated" : "unauthenticated");
    const [user, setUser] = useState<SessionUser | undefined>(session ?? undefined);

    const setLogin = useCallback((nextUser: SessionUser) => {
        setUser(nextUser);
        setAuthStatus("authenticated");
    }, []);

    const logout = useCallback(() => {
        clearSession();
        setUser(undefined);
        setAuthStatus("unauthenticated");
    }, []);

    const value = useMemo(
        () => ({ authStatus, user, setLogin, logout }),
        [authStatus, user, setLogin, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
