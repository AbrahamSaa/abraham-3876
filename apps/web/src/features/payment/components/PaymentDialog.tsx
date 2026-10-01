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
import { PaymentFail } from "./PaymentFail"
import { PaymentForm } from "./PaymentForm"
import { PaymentSuccess } from "./PaymentSuccess"

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
    const [open, setOpen] = useState(false)
    const [state, setState] = useState<PaymentState>(INITIAL_STATE)

    const reset = () => setState(INITIAL_STATE)

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen)
        if (!nextOpen) reset()
    }

    const close = () => handleOpenChange(false)

    // TODO: replace with the real payment service call, then
    // setState({ status: "success", receipt }) or setState({ status: "error", message }).
    const handlePay = async () => {}

    const renderBody = () => {
        switch (state.status) {
            case "form":
                return <PaymentForm onSubmit={handlePay} />
            case "success":
                return <PaymentSuccess receipt={state.receipt} onClose={close} />
            case "error":
                return <PaymentFail message={state.message} onRetry={reset} />
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={handleOpenChange}>
            <AlertDialogTrigger render={trigger} />
            <AlertDialogContent>
                <PaymentDialogHeader />
                {renderBody()}
            </AlertDialogContent>
        </AlertDialog>
    )
}
