import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("An error ocurred when trying to initialize AuthContext");
    }

    return context;
}