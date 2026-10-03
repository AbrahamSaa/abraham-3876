import type { Response } from "express";
import { describe, expect, it, vi } from "vitest";
import type { CustomRequest } from "../types/request";
import { authenticated } from "./authenticated";

const run = (authorization?: string) => {
    const req = { headers: { authorization } } as unknown as CustomRequest;
    const res = { status: vi.fn(), json: vi.fn() };
    res.status.mockReturnValue(res);
    const next = vi.fn();

    authenticated(req, res as unknown as Response, next);

    return { req, res, next };
};

describe("authenticated middleware", () => {
    it("sets userId and calls next with a valid Bearer token", () => {
        const { req, res, next } = run("Bearer user-123");

        expect(req.userId).toBe("user-123");
        expect(next).toHaveBeenCalledOnce();
        expect(res.status).not.toHaveBeenCalled();
    });

    it.each([
        ["no authorization header", undefined],
        ["an empty header", ""],
        ["a different scheme", "Basic user-123"],
        ["a lowercase scheme", "bearer user-123"],
        ["a scheme without a token", "Bearer"],
        ["a scheme with an empty token", "Bearer "],
        ["a token without a scheme", "user-123"],
    ])("responds 401 with %s", (_label, header) => {
        const { req, res, next } = run(header);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: "A valid Bearer token is required" });
        expect(next).not.toHaveBeenCalled();
        expect(req.userId).toBeUndefined();
    });
});
