import { X } from "lucide-react"
import { PAYMENT_COPY } from "../constants/payment.copy"
import { PaymentResult } from "./PaymentResult"

type PaymentFailProps = {
    message: string;
    onRetry: () => void;
}

export const PaymentFail = ({ message, onRetry }: PaymentFailProps) => (
    <PaymentResult
        icon={<X className="text-red-500" size={28} />}
        iconClassName="bg-red-200"
        title={PAYMENT_COPY.fail.title}
        description={<p className="text-gray-500 text-sm text-center mb-4">{message}</p>}
        actionTitle={PAYMENT_COPY.fail.retry}
        onAction={onRetry} />
)
