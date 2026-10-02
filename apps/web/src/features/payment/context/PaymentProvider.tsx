import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import type { PaymentFormValues } from "@snail/shared";
import { PaymentContext } from "./PaymentContext";
import { useAuth } from "../../auth/hooks/useAuth";
import { getCard, getFund, saveCard, saveFunds } from "../services/payment";
import type { UserFunds } from "../types/user-funds";
import type { UserCards } from "../types/user-cards";

export const PaymentProvider = ({ children }: PropsWithChildren) => {
    const { user } = useAuth();
    const userId = user?.id;
    const [userFunds, setUserFunds] = useState<UserFunds | undefined | null>(undefined);
    const [userCard, setUserCard] = useState<UserCards | undefined>(undefined);

    // Load the stored card and funds whenever the session user changes (login/logout).
    useEffect(() => {
        setUserFunds(userId ? getFund(userId) : null);
        setUserCard(userId ? getCard(userId) : undefined);
    }, [userId]);

    const addFunds = useCallback((amount: number) => {
        if (!userId) return;
        saveFunds(userId, amount);
        setUserFunds(getFund(userId));
    }, [userId]);

    const storeCard = useCallback((card: PaymentFormValues) => {
        if (!userId) return;
        saveCard(userId, card);
        setUserCard(getCard(userId));
    }, [userId]);

    const value = useMemo(
        () => ({ userCard, userFunds, addFunds, storeCard }),
        [userCard, userFunds, addFunds, storeCard]
    );

    return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
}
