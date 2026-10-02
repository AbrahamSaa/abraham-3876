import { storage, type PaymentResponse } from "@snail/shared";
import { SESSION_KEY } from "../features/auth/constants/storage-keys";
import type { SessionUser } from "../features/auth/interfaces/user.interface";
import { ErrorPayment } from "@/src/types/index";

const apiUrl = import.meta.env.VITE_API_URL ?? "";
const timeoutMs = Number(import.meta.env.VITE_TIMEOUT) || 9000;

export const post = async <TRequest, TResponse>(data: TRequest, endpoint: string): Promise<TResponse> => {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    const user = storage.get<SessionUser>(SESSION_KEY);

    if (user) {
        headers["Authorization"] = `Bearer ${user.id}`;
    }

    const response = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(timeoutMs),
    });

    if (!response.ok) {
        // Failed operations share the PaymentResponse shape; `error` covers auth/server errors.
        const errorData: Partial<PaymentResponse> & { error?: string } = await response.json().catch(() => ({}));
        throw new ErrorPayment(errorData.status_detail ?? errorData.error ?? "Error on payment", {
            status: response.status,
            errorStatus: errorData.error_status,
            issues: errorData.issues,
        });
    }

    return response.json();
}
