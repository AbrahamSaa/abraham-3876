type ErrorPaymentOptions = {
    status?: number;
    errorStatus?: number;
    issues?: unknown[];
};

export class ErrorPayment extends Error {
    public readonly status?: number;
    public readonly errorStatus: number;
    public readonly issues?: unknown[];

    constructor(message: string, { status, errorStatus = 0, issues }: ErrorPaymentOptions = {}) {
        super(message);
        this.name = "ErrorPayment";
        this.status = status;
        this.errorStatus = errorStatus;
        this.issues = issues;
    }
}
