import type { HashPassword } from "../interfaces/hashPassword.interface";

const ITERATIONS = 100;

const toBase64 = (buf: ArrayBuffer | Uint8Array) => btoa(String.fromCharCode(... new Uint8Array(buf)));

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
            salt: salt,
            iterations: ITERATIONS
        },
        key,
        256
    )
};

export const hashPassword = async (password: string): Promise<HashPassword> => {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const hash = await derive(password, salt);

    return {
        salt: toBase64(salt), hash: toBase64(hash)
    };
}


export const verifyPassword = async (password: string, salt: string, hash: string): Promise<boolean> => {
    const candidate = toBase64(await derive(password, fromBase64(salt)));

    return candidate == hash;
}