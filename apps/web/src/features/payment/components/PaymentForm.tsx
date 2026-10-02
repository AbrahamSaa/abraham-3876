import { AlertDialogCancel } from "@/components/ui/alert-dialog"
import { SnailButton } from "@/src/components/SnailButton"
import { SnailInput } from "@/src/components/SnailInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { CardErrors, CardErrorStatus, formatCurrency, paymentSchema, type PaymentFormInput, type PaymentFormValues } from "@snail/shared"
import { CreditCard } from "lucide-react"
import { useMemo } from "react"
import { useForm, useWatch } from "react-hook-form"
import { PAYMENT_COPY } from "../constants/payment.copy"
import { formatCardNumber, formatExpDate, usePaymentMasks } from "../hooks/usePaymentMasks"
import { TestCards, type TestCard } from "./TestCards"
import { ErrorPayment } from "@/src/types"
import { SnailAlert } from "@/src/components/SnailAlert"
import type { UserCards } from "../types/user-cards"

const FULL_WIDTH = "col-span-2"
const COPY = PAYMENT_COPY.form

interface Props {
    isLoading: boolean;
    userCard: UserCards | undefined;
    onSubmit: (values: PaymentFormValues) => Promise<void>;
}

export const PaymentForm = ({ onSubmit, isLoading, userCard }: Props) => {
    const savedValues = useMemo<PaymentFormInput>(() => ({
        cardNumber: formatCardNumber(userCard?.card ?? ""),
        name: userCard?.name ?? "",
        cvv: userCard?.cvv ?? "",
        date: formatExpDate(userCard?.date ?? ""),
        amount: "",
    }), [userCard]);

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        control,

        formState: { errors },
    } = useForm<PaymentFormInput, unknown, PaymentFormValues>({
        resolver: zodResolver(paymentSchema),
        mode: "onTouched",
        // Memoized: `values` re-syncs the form whenever its identity changes, which would wipe user input.
        values: savedValues,
    });
    const { cardMask, expDateMask, cvvMask } = usePaymentMasks();

    const amount = useWatch({ control, name: "amount" });
    const submitLabel = `Pagar ${formatCurrency(amount)}`;

    const fillTestCard = ({ number, date, cvv }: TestCard) => {
        setValue("cardNumber", formatCardNumber(number));
        if (date) setValue("date", formatExpDate(date));
        if (cvv) setValue("cvv", cvv);
    }

    const submitPayment = async (values: PaymentFormValues) => {
        try {
            await onSubmit(values);
        } catch (error) {
            if (error instanceof ErrorPayment) {
                setError("root", { message: CardErrors[error.errorStatus] ?? COPY.genericError, type: "manual" });
            } else if (error instanceof DOMException && (error.name === "TimeoutError" || error.name === "AbortError")) {
                setError("root", { message: CardErrors[CardErrorStatus.TIMEOUT], type: "timeout" });
            } else {
                setError("root", { message: COPY.genericError, type: "manual" });
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitPayment)} className="grid grid-cols-2 gap-3">
                <SnailInput
                    label={COPY.amountLabel}
                    placeholder="0.00"
                    type="number"
                    inputMode="decimal"
                    suffixIcon={<span className="text-gray-500 text-sm">MXN</span>}
                    prefixIcon={<span className="text-gray-500 text-sm">$</span>}
                    required
                    fieldClassName={FULL_WIDTH}
                    {...register("amount")}
                    error={errors.amount?.message} />
                <h5 className="text-sm uppercase font-bold font-heading text-mauve-800 col-span-2">{COPY.cardSection}</h5>
                <SnailInput
                    label={COPY.nameLabel}
                    placeholder={COPY.namePlaceholder}
                    required
                    fieldClassName={FULL_WIDTH}
                    {...register("name")}
                    error={errors.name?.message} />
                <SnailInput
                    maskRef={cardMask}
                    label={COPY.cardNumberLabel}
                    placeholder="0000 0000 0000 0000"
                    inputMode="numeric"
                    prefixIcon={<CreditCard />}
                    required
                    fieldClassName={FULL_WIDTH}
                    {...register("cardNumber")}
                    error={errors.cardNumber?.message} />
                <SnailInput
                    maskRef={expDateMask}
                    label={COPY.expiryLabel}
                    placeholder={COPY.expiryPlaceholder}
                    required
                    {...register("date")}
                    error={errors.date?.message} />
                <SnailInput
                    maskRef={cvvMask}
                    label={COPY.cvvLabel}
                    placeholder="000"
                    type="password"
                    required
                    {...register("cvv")}
                    error={errors.cvv?.message} />

                {errors.root && <SnailAlert
                    className={FULL_WIDTH}
                    variant={"destructive"}
                    title={PAYMENT_COPY.fail.title}
                    description={errors.root.message ?? COPY.genericError} />
                }
                <div className={FULL_WIDTH}>
                    <SnailButton type="submit" className="w-full" isLoading={isLoading} title={submitLabel} />
                </div>
                <AlertDialogCancel disabled={isLoading} className={`cursor-pointer ${FULL_WIDTH}`} variant="destructive">
                    {COPY.cancel}
                </AlertDialogCancel>
            </form>

            <TestCards onSelect={fillTestCard} />
        </>
    )
}
