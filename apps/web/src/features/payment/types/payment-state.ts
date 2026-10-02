import type { PaymentResponse } from "@snail/shared";

export type PaymentState =
    | { status: "form" }
    | { status: "success"; receipt: PaymentResponse; newBalance: number };
