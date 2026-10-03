import type { Response } from "express";
import { CardErrorStatus } from "@snail/shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { CustomRequest } from "../../types/request";
import { PaymentController } from "./payment.controller";

const validBody = {
    name: "Snail Tester",
    cardNumber: "1234123412341234",
    date: "12/26",
    cvv: "543",
    amount: 100,
    email: "snail@test.com",
};

const makeReq = (body: unknown = validBody, headers: Record<string, string> = {}) =>
    ({ body, headers, userId: "user-1" }) as unknown as CustomRequest;

const makeRes = () => {
    const res = {
        status: vi.fn(),
        json: vi.fn(),
        on: vi.fn(),
    };
    res.status.mockReturnValue(res);
    res.json.mockReturnValue(res);
    return res;
};

const send = async (req: CustomRequest) => {
    const res = makeRes();
    await new PaymentController().createPaymentIntent(req, res as unknown as Response);
    return res;
};

describe("PaymentController.createPaymentIntent", () => {
    beforeEach(() => {
        vi.useFakeTimers({ toFake: ["Date"] });
        vi.setSystemTime(new Date("2026-01-15T12:00:00Z"));
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllEnvs();
    });

    it("approves a valid payment", async () => {
        const res = await send(makeReq());

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                status: "approved",
                status_detail: "accredited",
                transaction_amount: 100,
                payer_id: "user-1",
                payer_email: "snail@test.com",
                card_number: "1234123412341234",
                authorization_code: expect.stringMatching(/^\d{6}$/),
            }),
        );
    });

    it("accepts a card number with spaces", async () => {
        const res = await send(makeReq({ ...validBody, cardNumber: "1234 1234 1234 1234" }));

        expect(res.status).toHaveBeenCalledWith(200);
    });

    it("returns 400 when the body fails validation", async () => {
        const res = await send(makeReq({ ...validBody, amount: 1 }));

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                status: "rejected",
                status_detail: "invalid_request_data",
                error_status: CardErrorStatus.BAD_REQUEST,
                issues: expect.any(Array),
            }),
        );
    });

    it("returns 400 when the body is missing", async () => {
        const res = await send(makeReq(null));

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it("returns 400 when the card is unknown", async () => {
        const res = await send(makeReq({ ...validBody, cardNumber: "9999999999999999" }));

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ status_detail: "card_not_found" }),
        );
    });

    it("rejects a wrong expiration date", async () => {
        const res = await send(makeReq({ ...validBody, date: "11/26" }));

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                status_detail: "invalid_expiration_date",
                error_status: CardErrorStatus.INVALID_EXPIRATION_DATE,
            }),
        );
    });

    it("rejects a wrong CVV", async () => {
        const res = await send(makeReq({ ...validBody, cvv: "000" }));

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                status_detail: "invalid_security_code",
                error_status: CardErrorStatus.INVALID_SECURITY_CODE,
            }),
        );
    });

    it("rejects the generic SnailPay error card with 402", async () => {
        const res = await send(makeReq({ ...validBody, cardNumber: "4111111100000000" }));

        expect(res.status).toHaveBeenCalledWith(402);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                status: "rejected",
                status_detail: "cc_rejected_other",
                error_status: CardErrorStatus.SNAIL_PAY_ERROR,
            }),
        );
    });

    it("rejects the insufficient funds card with 402", async () => {
        const res = await send(makeReq({ ...validBody, cardNumber: "4111000000000000" }));

        expect(res.status).toHaveBeenCalledWith(402);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                status_detail: "cc_rejected_insufficient_amount",
                error_status: CardErrorStatus.INSUFFICIENT_FUNDS,
            }),
        );
    });

    it("sends nothing when the client disconnects during a timeout card", async () => {
        const res = makeRes();
        const pending = new PaymentController().createPaymentIntent(
            makeReq({ ...validBody, cardNumber: "4222222222222222" }),
            res as unknown as Response,
        );

        // Simulate the client closing the connection while we wait.
        const onClose = res.on.mock.calls.find(([event]) => event === "close")?.[1];
        onClose();
        await pending;

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("returns 503 when the simulate header is sent", async () => {
        const res = await send(makeReq(validBody, { "x-snailpay-simulate": "system_error" }));

        expect(res.status).toHaveBeenCalledWith(503);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                status: "rejected",
                status_detail: "system_error",
                error_status: CardErrorStatus.SYSTEM_ERROR,
            }),
        );
    });

    it("returns 503 when SNAILPAY_DOWN is set", async () => {
        vi.stubEnv("SNAILPAY_DOWN", "true");

        const res = await send(makeReq());

        expect(res.status).toHaveBeenCalledWith(503);
    });
});
