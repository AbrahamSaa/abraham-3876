import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { SnailButton } from "@/src/components/SnailButton"
import { Snail } from "lucide-react"
import { useState } from "react"
import { PAYMENT_COPY } from "../constants/payment.copy"
import type { PaymentState } from "../types/payment-state"
import { PaymentForm } from "./PaymentForm"
import { PaymentSuccess } from "./PaymentSuccess"
import type { PaymentFormValues } from "@snail/shared"
import { addAmounts, usePayment } from "../services/payment";
import { useAuth } from "../../auth/hooks/useAuth"
import { usePaymentContext } from "../hooks/usePaymentContext"
import { ErrorPayment } from "@/src/types"

const INITIAL_STATE: PaymentState = { status: "form" }

const PaymentDialogHeader = () => (
    <AlertDialogHeader>
        <AlertDialogMedia>
            <Snail className="text-primary" />
        </AlertDialogMedia>
        <AlertDialogTitle>{PAYMENT_COPY.brand}</AlertDialogTitle>
        <AlertDialogDescription>{PAYMENT_COPY.tagline}</AlertDialogDescription>
    </AlertDialogHeader>
)

const trigger = (
    <SnailButton
        isLoading={false}
        title={PAYMENT_COPY.trigger}
        variant="outline"
        className="text-mist-800 cursor-pointer" />
)

export const PaymentDialog = () => {
    const { addFunds, storeCard, userFunds, userCard } = usePaymentContext();
    const { user } = useAuth();
    const [open, setOpen] = useState(false)
    const [state, setState] = useState<PaymentState>(INITIAL_STATE)
    const { mutateAsync, isPending } = usePayment()
    const reset = () => setState(INITIAL_STATE)

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen)
        if (!nextOpen) reset()
    }

    const close = () => handleOpenChange(false);

    const handlePay = async (values: PaymentFormValues) => {
        const receipt = await mutateAsync({ ...values, email: user?.email ?? "" })

        // Never credit funds unless SnailPay explicitly approved the operation.
        if (receipt.status !== "approved") {
            throw new ErrorPayment(receipt.status_detail, { errorStatus: receipt.error_status });
        }

        const newBalance = addAmounts(userFunds?.funds ?? 0, receipt.transaction_amount);
        storeCard(values);
        addFunds(receipt.transaction_amount);
        setState({ status: "success", receipt, newBalance });
    }

    const renderBody = () => {
        switch (state.status) {
            case "form":
                return <PaymentForm onSubmit={handlePay} isLoading={isPending} userCard={userCard} />
            case "success":
                return <PaymentSuccess receipt={state.receipt} onClose={close} newBalance={state.newBalance} />
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={handleOpenChange} >
            <AlertDialogTrigger render={trigger} />
            <AlertDialogContent className={"min-h-auto max-h-[calc(100dvh-2rem)] overflow-y-auto"}>
                <PaymentDialogHeader />
                {renderBody()}
            </AlertDialogContent>
        </AlertDialog>
    )
}
