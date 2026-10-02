import { useContext } from "react";
import { PaymentContext } from "../context/PaymentContext";

export const usePaymentContext = () => {
    const context = useContext(PaymentContext);

    if (context === undefined) {
        throw new Error("usePaymentContext must be used within a PaymentProvider");
    }

    return context;
}
