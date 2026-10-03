import { post } from "@/src/lib/payment-api";
import type { PaymentFormValues, PaymentRequestValues, PaymentResponse } from "@snail/shared";
import { useMutation } from "@tanstack/react-query";
import { storage } from "@snail/shared";
import type { UserCards } from "../types/user-cards";
import { AMOUNT_KEY, SAVED_CARDS } from "../constants/storage-keys";
import type { UserFunds } from "../types/user-funds";

export const usePayment = () =>
    useMutation({
        mutationFn: (values: PaymentRequestValues) =>
            post<PaymentRequestValues, PaymentResponse>(values, "/api/payment"),
        retry: 0,
    });

export const addAmounts = (a: number, b: number) => Math.round((a + b) * 100) / 100;

const getCards = () => storage.get<UserCards[]>(SAVED_CARDS) ?? [];
const getFunds = () => storage.get<UserFunds[]>(AMOUNT_KEY) ?? [];

const upsert = <T extends { userId: string }>(items: T[], item: T) =>
    items.some((saved) => saved.userId === item.userId)
        ? items.map((saved) => (saved.userId === item.userId ? item : saved))
        : [...items, item];

export const getCard = (userId: string) => getCards().find((card) => card.userId === userId);

export const getFund = (userId: string): UserFunds =>
    getFunds().find((fund) => fund.userId === userId) ?? { userId, funds: 0 };

export const saveCard = (userId: string, card: PaymentFormValues) => {
    const newCard: UserCards = {
        userId,
        card: card.cardNumber,
        cvv: card.cvv,
        date: card.date,
        name: card.name,
    };

    storage.set<UserCards[]>(SAVED_CARDS, upsert(getCards(), newCard));
};

export const saveFunds = (userId: string, amount: number) => {
    const funds: UserFunds = { userId, funds: addAmounts(getFund(userId).funds, amount) };

    storage.set<UserFunds[]>(AMOUNT_KEY, upsert(getFunds(), funds));
};
