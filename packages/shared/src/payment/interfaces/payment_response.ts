export type PaymentStatus = "in_process" | "approved" | "rejected" | "cancelled" | "refunded";

/**
 * Shape returned by SnailPay for approved payments, transaction errors and system errors.
 * `card_number` and `cvv` are always fictitious test data.
 */
export interface PaymentResponse {
    id: string;
    status: PaymentStatus;
    status_detail: string;
    transaction_amount: number;
    date_created: string;
    authorization_code?: string;
    reference: string;
    payer_id?: string;
    payer_email?: string;
    card_number?: string;
    cvv?: string;
    /** Machine-readable error, present only when the operation was not approved. */
    error_status?: number;
    issues?: unknown[];
}
