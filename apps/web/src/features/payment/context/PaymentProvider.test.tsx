import { act, renderHook } from "@testing-library/react"
import type { PaymentFormValues } from "@snail/shared"
import type { ReactNode } from "react"
import { beforeEach, describe, expect, test, vi } from "vitest"
import { useAuth } from "../../auth/hooks/useAuth"
import type { SessionUser } from "../../auth/types/user"
import { usePaymentContext } from "../hooks/usePaymentContext"
import { getCard, getFund, saveCard, saveFunds } from "../services/payment"
import type { UserCards } from "../types/user-cards"
import type { UserFunds } from "../types/user-funds"
import { PaymentProvider } from "./PaymentProvider"

// Both dependencies are replaced with fakes. The payment service (storage) has its own
// tests, and mocking useAuth lets each test pick who is logged in without a real AuthProvider.
vi.mock("../services/payment", () => ({
    getCard: vi.fn(),
    getFund: vi.fn(),
    saveCard: vi.fn(),
    saveFunds: vi.fn(),
}))

vi.mock("../../auth/hooks/useAuth", () => ({
    useAuth: vi.fn(),
}))

const user: SessionUser = { id: "user-1", email: "abraham@test.com", name: "Abraham" }
const otherUser: SessionUser = { id: "user-2", email: "other@test.com", name: "Other" }

const card: UserCards = { userId: "user-1", card: "1234123412341234", cvv: "123", date: "10/26", name: "Abraham" }
const funds: UserFunds = { userId: "user-1", funds: 50 }

const cardValues: PaymentFormValues = { cardNumber: "1234123412341234", cvv: "123", date: "10/26", name: "Abraham", amount: 20 }

const wrapper = ({ children }: { children: ReactNode }) => <PaymentProvider>{children}</PaymentProvider>

const renderPayment = () => renderHook(() => usePaymentContext(), { wrapper })

// Controls which user the (mocked) useAuth returns on the next render.
const loginAs = (sessionUser: SessionUser | undefined) => {
    vi.mocked(useAuth).mockReturnValue({
        user: sessionUser,
        authStatus: sessionUser ? "authenticated" : "unauthenticated",
        setLogin: vi.fn(),
        logout: vi.fn(),
    })
}

beforeEach(() => {
    vi.resetAllMocks()
    loginAs(user)
    vi.mocked(getFund).mockReturnValue(funds)
    vi.mocked(getCard).mockReturnValue(card)
})

describe("Initial state", () => {
    test("loads the stored card and funds of the logged user", () => {
        const { result } = renderPayment()

        expect(getFund).toHaveBeenCalledWith("user-1")
        expect(getCard).toHaveBeenCalledWith("user-1")
        expect(result.current.userFunds).toEqual(funds)
        expect(result.current.userCard).toEqual(card)
    })

    test("has null funds and no card when nobody is logged in", () => {
        loginAs(undefined)

        const { result } = renderPayment()

        expect(getFund).not.toHaveBeenCalled()
        expect(getCard).not.toHaveBeenCalled()
        expect(result.current.userFunds).toBeNull()
        expect(result.current.userCard).toBeUndefined()
    })
})

describe("User change", () => {
    test("reloads the data when another user logs in", () => {
        const { result, rerender } = renderPayment()
        vi.mocked(getFund).mockReturnValue({ userId: "user-2", funds: 5 })
        vi.mocked(getCard).mockReturnValue(undefined)

        // Change the fake user and render again, like a logout followed by a new login.
        loginAs(otherUser)
        rerender()

        expect(getFund).toHaveBeenLastCalledWith("user-2")
        expect(result.current.userFunds).toEqual({ userId: "user-2", funds: 5 })
        expect(result.current.userCard).toBeUndefined()
    })

    test("clears the data on logout", () => {
        const { result, rerender } = renderPayment()

        loginAs(undefined)
        rerender()

        expect(result.current.userFunds).toBeNull()
        expect(result.current.userCard).toBeUndefined()
    })
})

describe("addFunds", () => {
    test("saves the amount and refreshes the funds from the service", () => {
        const { result } = renderPayment()
        // Simulates the service returning the new total after saving.
        vi.mocked(getFund).mockReturnValue({ userId: "user-1", funds: 70 })

        act(() => result.current.addFunds(20))

        expect(saveFunds).toHaveBeenCalledWith("user-1", 20)
        expect(result.current.userFunds).toEqual({ userId: "user-1", funds: 70 })
    })

    test("does nothing when nobody is logged in", () => {
        loginAs(undefined)
        const { result } = renderPayment()

        act(() => result.current.addFunds(20))

        expect(saveFunds).not.toHaveBeenCalled()
        expect(result.current.userFunds).toBeNull()
    })
})

describe("storeCard", () => {
    test("saves the card and refreshes it from the service", () => {
        vi.mocked(getCard).mockReturnValue(undefined)
        const { result } = renderPayment()
        vi.mocked(getCard).mockReturnValue(card)

        act(() => result.current.storeCard(cardValues))

        expect(saveCard).toHaveBeenCalledWith("user-1", cardValues)
        expect(result.current.userCard).toEqual(card)
    })

    test("does nothing when nobody is logged in", () => {
        loginAs(undefined)
        const { result } = renderPayment()

        act(() => result.current.storeCard(cardValues))

        expect(saveCard).not.toHaveBeenCalled()
        expect(result.current.userCard).toBeUndefined()
    })
})

describe("usePaymentContext", () => {
    test("throws when used outside a PaymentProvider", () => {
        vi.spyOn(console, "error").mockImplementation(() => { })

        expect(() => renderHook(() => usePaymentContext())).toThrow(
            "usePaymentContext must be used within a PaymentProvider",
        )
    })
})
