import { randomUUID } from "node:crypto";
import type { Response } from "express";
import { CardErrorStatus, paymentRequestSchema, type PaymentResponse } from "@snail/shared";
import cardsData from "../../data/cards.json";
import type { CustomRequest } from "../../types/request";

type MockCard =
    | { number: string; date: string; cvv: string; result: true }
    | { number: string; message: string; errorStatus: keyof typeof CardErrorStatus; httpStatus: number; result: false };

const cards = cardsData.cards as MockCard[];

const TIMEOUT_DELAY_MS = Number(process.env.SNAILPAY_TIMEOUT_MS) || 10_000;

// Set SNAILPAY_DOWN=true (or send the header `x-snailpay-simulate: system_error`)
// to simulate an internal SnailPay outage. No payment is approved while it is active.
const isSystemDown = (req: CustomRequest) =>
    process.env.SNAILPAY_DOWN === "true" || req.headers["x-snailpay-simulate"] === "system_error";

const asString = (value: unknown) => (typeof value === "string" ? value : undefined);

const normalizeCard = (value: string) => value.replace(/[\s-]/g, "");

const delay = (ms: number, signal: AbortSignal) =>
    new Promise<void>((resolve) => {
        const timer = setTimeout(resolve, ms);
        signal.addEventListener("abort", () => {
            clearTimeout(timer);
            resolve();
        }, { once: true });
    });

type ErrorResponseInput = {
    detail: string;
    errorStatus: number;
    httpStatus: number;
    issues?: unknown[];
};

export class PaymentController {
    async createPaymentIntent(req: CustomRequest, res: Response) {
        const body = (req.body ?? {}) as Record<string, unknown>;
        const rawAmount = Number(body.amount);

        // Every outcome (approved, transaction error, system error) shares the same shape.
        const rawCard = asString(body.cardNumber);
        const baseResponse = (): PaymentResponse => ({
            id: randomUUID(),
            status: "rejected",
            status_detail: "",
            transaction_amount: Number.isFinite(rawAmount) ? rawAmount : 0,
            date_created: new Date().toISOString(),
            reference: `SP-${Date.now()}`,
            payer_id: req.userId,
            payer_email: asString(body.email),
            card_number: rawCard === undefined ? undefined : normalizeCard(rawCard),
            cvv: asString(body.cvv),
        });

        const reject = ({ detail, errorStatus, httpStatus, issues }: ErrorResponseInput) =>
            res.status(httpStatus).json({
                ...baseResponse(),
                status_detail: detail,
                error_status: errorStatus,
                issues,
            } satisfies PaymentResponse);

        if (isSystemDown(req)) {
            return reject({
                detail: "system_error",
                errorStatus: CardErrorStatus.SYSTEM_ERROR,
                httpStatus: 503,
            });
        }

        const parsed = paymentRequestSchema.safeParse(body);
        if (!parsed.success) {
            return reject({
                detail: "invalid_request_data",
                errorStatus: CardErrorStatus.BAD_REQUEST,
                httpStatus: 400,
                issues: parsed.error.issues,
            });
        }

        const { amount, cardNumber, date, cvv, email } = parsed.data;
        const card = cards.find((candidate) => candidate.number === cardNumber);

        if (!card) {
            return reject({
                detail: "card_not_found",
                errorStatus: CardErrorStatus.BAD_REQUEST,
                httpStatus: 400,
            });
        }

        if (!card.result) {
            const errorStatus = CardErrorStatus[card.errorStatus];

            if (errorStatus === CardErrorStatus.TIMEOUT) {
                const controller = new AbortController();
                res.on("close", () => controller.abort());
                await delay(TIMEOUT_DELAY_MS, controller.signal);
                // The client gave up while waiting, nothing left to answer.
                if (controller.signal.aborted) return;
            }

            return reject({ detail: card.message, errorStatus, httpStatus: card.httpStatus });
        }

        if (date !== card.date) {
            return reject({
                detail: "invalid_expiration_date",
                errorStatus: CardErrorStatus.INVALID_EXPIRATION_DATE,
                httpStatus: 400,
            });
        }

        if (cvv !== card.cvv) {
            return reject({
                detail: "invalid_security_code",
                errorStatus: CardErrorStatus.INVALID_SECURITY_CODE,
                httpStatus: 400,
            });
        }

        const approved: PaymentResponse = {
            ...baseResponse(),
            status: "approved",
            status_detail: "accredited",
            transaction_amount: amount,
            authorization_code: String(Math.floor(100000 + Math.random() * 900000)),
            payer_email: email,
            card_number: cardNumber,
            cvv,
        };

        res.status(200).json(approved);
    }
}
