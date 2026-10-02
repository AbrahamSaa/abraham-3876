import { createContext } from "react";
import type { PaymentFormValues } from "@snail/shared";
import type { UserFunds } from "../types/user-funds";
import type { UserCards } from "../types/user-cards";

export interface PaymentContextType {
    userFunds: UserFunds | undefined | null;
    userCard: UserCards | undefined;
    addFunds: (amount: number) => void;
    storeCard: (card: PaymentFormValues) => void;
}

export const PaymentContext = createContext<PaymentContextType | undefined>(undefined);
