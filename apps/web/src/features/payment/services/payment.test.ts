import { describe, expect, test } from "vitest";
import type { PaymentFormValues } from "@snail/shared";
import { addAmounts, getCard, getFund, saveCard, saveFunds } from "./payment";
import { AMOUNT_KEY, SAVED_CARDS } from "../constants/storage-keys";

const USER_ID = "1234";

const cardValues = (overrides: Partial<PaymentFormValues> = {}): PaymentFormValues => ({
    cardNumber: "4111111111111111",
    cvv: "123",
    date: "12/30",
    name: "Test User",
    ...overrides,
}) as PaymentFormValues;

describe("addAmounts", () => {
    test("adds two whole amounts", () => {
        expect(addAmounts(100, 50)).toBe(150);
    });

    test("adds decimal amounts", () => {
        expect(addAmounts(125.2, 35.13)).toBe(160.33);
    });

    test("rounds away floating point error", () => {
        // raw JS: 0.1 + 0.2 === 0.30000000000000004
        expect(addAmounts(0.1, 0.2)).toBe(0.3);
    });
});

describe("Funds", () => {
    test("returns a fund with 0 when the user has none", () => {
        expect(getFund(USER_ID)).toEqual({ userId: USER_ID, funds: 0 });
    });

    test("saves user funds", () => {
        saveFunds(USER_ID, 100);
        const fund = getFund(USER_ID);

        expect(fund).toEqual({ userId: USER_ID, funds: 100 });
        expect(JSON.parse(localStorage.getItem(AMOUNT_KEY)!)).toEqual([fund]);
    });

    test("adds funds to an existing wallet", () => {
        saveFunds(USER_ID, 100);
        saveFunds(USER_ID, 50);

        expect(getFund(USER_ID)).toEqual({ userId: USER_ID, funds: 150 });
    });

    test("rounds accumulated decimal funds", () => {
        saveFunds(USER_ID, 0.1);
        saveFunds(USER_ID, 0.2);

        expect(getFund(USER_ID).funds).toBe(0.3);
    });

    test("keeps funds of different users separate", () => {
        saveFunds("a", 10);
        saveFunds("b", 20);

        expect(getFund("a")).toEqual({ userId: "a", funds: 10 });
        expect(getFund("b")).toEqual({ userId: "b", funds: 20 });
        expect(JSON.parse(localStorage.getItem(AMOUNT_KEY)!)).toHaveLength(2);
    });

    test("does not touch other users when adding funds", () => {
        saveFunds("a", 10);
        saveFunds("b", 20);
        saveFunds("a", 5);

        expect(getFund("a").funds).toBe(15);
        expect(getFund("b").funds).toBe(20);
    });
});

describe("Cards", () => {
    test("returns undefined when the user has no saved card", () => {
        expect(getCard(USER_ID)).toBeUndefined();
    });

    test("saves and retrieves a card", () => {
        saveCard(USER_ID, cardValues());

        expect(getCard(USER_ID)).toEqual({
            userId: USER_ID,
            card: "4111111111111111",
            cvv: "123",
            date: "12/30",
            name: "Test User",
        });
    });

    test("replaces the card when saving twice for the same user", () => {
        saveCard(USER_ID, cardValues());
        saveCard(USER_ID, cardValues({ name: "Other Name" }));

        expect(getCard(USER_ID)?.name).toBe("Other Name");
        expect(JSON.parse(localStorage.getItem(SAVED_CARDS)!)).toHaveLength(1);
    });
});
