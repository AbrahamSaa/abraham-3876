import { Check } from "lucide-react"
import { PAYMENT_COPY } from "../constants/payment.copy"
import { PaymentResult } from "./PaymentResult"
import type { PaymentResponse } from "@snail/shared";

const formatMoney = (value: number) => `$${value.toFixed(2)}`

type PaymentSuccessProps = {
    receipt: PaymentResponse;
    onClose: () => void;
    newBalance: number;
}

const getRowClassName = (index: number, total: number) => {
    const isFirst = index === 0
    const isLast = index === total - 1
    const padding = isFirst ? "pb-2" : isLast ? "pt-2" : "py-2"
    const border = isLast ? "" : "border-b border-gray-300"
    return `flex flex-row gap-3 justify-between ${padding} ${border}`
}

export const PaymentSuccess = ({ receipt, onClose, newBalance }: PaymentSuccessProps) => {

    const rows = [
        { label: "Monto abonado", value: formatMoney(receipt.transaction_amount) },
        { label: "Nuevo saldo", value: formatMoney(newBalance) },
        { label: "Código de autorización", value: receipt.authorization_code },
        { label: "Referencia", value: receipt.reference },
        { label: "Fecha", value: receipt.date_created }
    ]

    return (
        <PaymentResult
            icon={<Check className="text-green-500" size={28} />}
            iconClassName="bg-green-200"
            title={PAYMENT_COPY.success.title}
            description={<p className="text-gray-500 text-sm">{PAYMENT_COPY.success.description}</p>}
            actionTitle={PAYMENT_COPY.success.close}
            actionVariant="outline"
            onAction={onClose}>
            <ul className="list-none rounded-sm shadow-sm p-3 w-full bg-gray-200 my-4">
                {rows.map((row, i) => (
                    <li key={row.label} className={getRowClassName(i, rows.length)}>
                        <span className="text-gray-500 text-sm">{row.label}</span>
                        <span className="font-bold">{row.value}</span>
                    </li>
                ))}
            </ul>
        </PaymentResult>
    )
}
