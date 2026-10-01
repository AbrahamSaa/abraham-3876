export type PaymentReceipt = {
    amount: number;
    newBalance: number;
    authorizationCode: string;
    reference: string;
    date: string;
    cardLast4: string;
};

export type PaymentState =
    | { status: "form" }
    | { status: "success"; receipt: PaymentReceipt }
    | { status: "error"; message: string };
