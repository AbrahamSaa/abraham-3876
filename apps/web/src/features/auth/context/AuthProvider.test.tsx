import { act, renderHook } from "@testing-library/react"
import type { ReactNode } from "react"
import { beforeEach, describe, expect, test, vi } from "vitest"
import type { SessionUser } from "../types/user"
import { clearSession, getStoredSession } from "../services/authService"
import { useAuth } from "../hooks/useAuth"
import { AuthProvider } from "./AuthProvider"

vi.mock("../services/authService", () => ({
    getStoredSession: vi.fn(),
    clearSession: vi.fn(),
}))

const user: SessionUser = { id: "user-1", email: "abraham@test.com", name: "Abraham" }

const wrapper = ({ children }: { children: ReactNode }) => <AuthProvider>{children}</AuthProvider>


const renderAuth = () => renderHook(() => useAuth(), { wrapper })

beforeEach(() => {
    vi.resetAllMocks()
    vi.mocked(getStoredSession).mockReturnValue(null)
})

describe("Initial state", () => {
    test("starts unauthenticated when there is no stored session", () => {
        const { result } = renderAuth()

        expect(result.current.authStatus).toBe("unauthenticated")
        expect(result.current.user).toBeUndefined()
    })

    test("starts authenticated with the stored session user", () => {
        vi.mocked(getStoredSession).mockReturnValue(user)

        const { result } = renderAuth()

        expect(result.current.authStatus).toBe("authenticated")
        expect(result.current.user).toEqual(user)
    })
})

describe("setLogin", () => {
    test("stores the user and marks the session as authenticated", () => {
        const { result } = renderAuth()

        act(() => result.current.setLogin(user))

        expect(result.current.authStatus).toBe("authenticated")
        expect(result.current.user).toEqual(user)
    })
})

describe("logout", () => {
    test("clears the stored session and the user state", () => {
        vi.mocked(getStoredSession).mockReturnValue(user)
        const { result } = renderAuth()

        act(() => result.current.logout())

        expect(clearSession).toHaveBeenCalledOnce()
        expect(result.current.authStatus).toBe("unauthenticated")
        expect(result.current.user).toBeUndefined()
    })
})

describe("useAuth", () => {
    test("throws when used outside an AuthProvider", () => {
        vi.spyOn(console, "error").mockImplementation(() => { })

        expect(() => renderHook(() => useAuth())).toThrow("useAuth must be used within an AuthProvider")
    })
})
