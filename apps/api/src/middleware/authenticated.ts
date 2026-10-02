import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../types/request";

// Simulation only: the web app sends the local user id as the bearer token.
export const authenticated = (req: CustomRequest, res: Response, next: NextFunction) => {
    const [scheme, token] = req.headers.authorization?.split(" ") ?? [];

    if (scheme !== "Bearer" || !token) {
        res.status(401).json({ error: "A valid Bearer token is required" });
        return;
    }

    req.userId = token;
    next();
};
