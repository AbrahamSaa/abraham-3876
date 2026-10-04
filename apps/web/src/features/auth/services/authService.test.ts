import type { LoginFormValues, SignupFormValues } from "@snail/shared"
import { beforeEach, describe, expect, test } from "vitest"
import { SESSION_KEY, STORED_USERS_KEY } from "../constants/storage-keys"
import type { StoredUser } from "../types/user"
import { clearSession, getStoredSession, login, signup } from "./authService"

const validUser = { name: "Abraham", email: "abraham@test.com", password: "Password1234" }

const signupValues = (overrides: Partial<SignupFormValues> = {}): SignupFormValues => ({
    ...validUser,
    confirmPassword: validUser.password,
    ...overrides,
})

const loginValues = (overrides: Partial<LoginFormValues> = {}): LoginFormValues => ({
    email: validUser.email,
    password: validUser.password,
    ...overrides,
})

const storedUsers = () => JSON.parse(localStorage.getItem(STORED_USERS_KEY) ?? "[]") as StoredUser[]

describe("Signup", () => {
    test("stores the user with a hash and salt instead of the plain password", async () => {
        await signup(signupValues())

        const [user] = storedUsers()
        expect(user).toMatchObject({ name: "Abraham", email: "abraham@test.com" })
        expect(user.id).toEqual(expect.any(String))
        expect(user.hash).toEqual(expect.any(String))
        expect(user.salt).toEqual(expect.any(String))
        expect(JSON.stringify(user)).not.toContain(validUser.password)
    })

    test("normalizes the email before storing it", async () => {
        await signup(signupValues({ email: "  Abraham@TEST.com " }))

        expect(storedUsers()[0].email).toBe("abraham@test.com")
    })

    test("rejects an email that is already registered, ignoring case and whitespace", async () => {
        await signup(signupValues())

        await expect(signup(signupValues({ email: " ABRAHAM@test.com" }))).rejects.toThrow("ya esta registrado")
        expect(storedUsers()).toHaveLength(1)
    })

    test("rejects an empty password and stores nothing", async () => {
        await expect(signup(signupValues({ password: "" }))).rejects.toThrow("no puede estar vacía")
        expect(storedUsers()).toHaveLength(0)
    })
})

describe("Login", () => {
    beforeEach(async () => {
        await signup(signupValues())
    })

    test("returns the session user without hash or salt and saves the session", async () => {
        const session = await login(loginValues())

        expect(session).toEqual({ id: expect.any(String), email: validUser.email, name: validUser.name })
        expect(session).not.toHaveProperty("hash")
        expect(session).not.toHaveProperty("salt")
        expect(JSON.parse(localStorage.getItem(SESSION_KEY)!)).toEqual(session)
    })

    test("accepts the email in a different case", async () => {
        await expect(login(loginValues({ email: "ABRAHAM@Test.com", password: validUser.password }))).resolves.toBeDefined()
    })

    test("rejects a wrong password without saving a session", async () => {
        await expect(login(loginValues({ password: "wrong" }))).rejects.toThrow("incorrecto")
        expect(localStorage.getItem(SESSION_KEY)).toBeNull()
    })

    test("uses the same error for an unknown email as for a wrong password", async () => {
        const unknown = await login(loginValues({ email: "nobody@test.com", password: "x" })).catch((e: Error) => e.message)
        const wrong = await login(loginValues({ password: "x" })).catch((e: Error) => e.message)

        expect(unknown).toBe(wrong)
    })
})

describe("Session", () => {
    test("getStoredSession returns null when there is no session", () => {
        expect(getStoredSession()).toBeNull()
    })

    test("getStoredSession strips hash and salt from sessions saved by older versions", () => {
        localStorage.setItem(SESSION_KEY, JSON.stringify({ id: "1", email: "a@a.com", name: "A", hash: "h", salt: "s" }))

        expect(getStoredSession()).toEqual({ id: "1", email: "a@a.com", name: "A" })
    })

    test("clearSession removes the session", () => {
        localStorage.setItem(SESSION_KEY, JSON.stringify({ id: "1", email: "a@a.com", name: "A" }))

        clearSession()

        expect(getStoredSession()).toBeNull()
    })
})
