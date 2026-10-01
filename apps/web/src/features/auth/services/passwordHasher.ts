import type { HashPassword } from "../interfaces/hash-password.interface";

// Demo value. A real deployment should use at least 600,000 iterations (OWASP guidance for PBKDF2-SHA256)
// and hash on the server, not in the browser.
const PBKDF2_ITERATIONS = 100;
const SALT_BYTES = 16;
const HASH_BITS = 256;

const toBase64 = (buf: ArrayBuffer | Uint8Array) => btoa(String.fromCharCode(...new Uint8Array(buf)));

const fromBase64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

const derive = async (password: string, salt: Uint8Array<ArrayBuffer>) => {
    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveBits"]
    );

    return crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            hash: "SHA-256",
            salt,
            iterations: PBKDF2_ITERATIONS,
        },
        key,
        HASH_BITS
    );
};

export const hashPassword = async (password: string): Promise<HashPassword> => {
    const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
    const hash = await derive(password, salt);

    return { salt: toBase64(salt), hash: toBase64(hash) };
};

export const verifyPassword = async (password: string, salt: string, hash: string): Promise<boolean> => {
    const candidate = toBase64(await derive(password, fromBase64(salt)));

    return candidate === hash;
};
