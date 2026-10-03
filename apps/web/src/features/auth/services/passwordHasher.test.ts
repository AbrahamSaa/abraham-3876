import { describe, expect, test } from "vitest"
import { hashPassword, verifyPassword } from "./passwordHasher";

describe("hash password", () => {
    test('It should has password and return a salt and hash', async () => {
        const password = "password1234"
        const response = await hashPassword(password);

        expect(response).toEqual({ salt: expect.any(String), hash: expect.any(String) });
    });

    test('It should return null if the password is empty', async () => {
        const password = ""
        const response = await hashPassword(password);

        expect(response).toBeNull();
    });
});


describe("Verify password", () => {
    test('Verify password should be true', async () => {
        const password = "password1234"
        const response = await hashPassword(password);
        expect(response).not.toBeNull();

        const { salt, hash } = response!;
        const verified = await verifyPassword(password, salt, hash);

        expect(verified).toBe(true);
    });

    test('Verify password should return false', async () => {
        const password = "password1234";
        const passwordWrong = "password123";

        const response = await hashPassword(password);
        expect(response).not.toBeNull();

        const { salt, hash } = response!;
        const verified = await verifyPassword(passwordWrong, salt, hash);

        expect(verified).toBe(false);
    });

    test('Hash password should be different', async () => {
        const password = "password1234";

        const responseA = await hashPassword(password);
        const responseB = await hashPassword(password);

        expect(responseB).not.toBeNull();
        expect(responseA).not.toBeNull();

        const { salt: saltA, hash: hashA } = responseA!;
        const { salt: saltB, hash: hashB } = responseB!;

        expect(saltA).not.toBe(saltB);
        expect(hashA).not.toBe(hashB);
    });
});