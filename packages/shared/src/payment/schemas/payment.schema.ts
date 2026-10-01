import { z } from "zod";

export const MIN_AMOUNT = 10;
export const MAX_AMOUNT = 10_000;

const NAME_REGEX = /^[a-zA-Z\s]+$/;
const CARD_NUMBER_REGEX = /^\d{15,16}$/;
const EXPIRY_DATE_REGEX = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CVV_REGEX = /^\d{3,4}$/;

const messages = {
    nameInvalid: "El nombre solo puede contener letras y espacios",
    nameTooShort: "El nombre debe tener al menos 3 caracteres",
    cardNumber: "El número de tarjeta debe tener 15 o 16 dígitos",
    dateFormat: "Formato inválido, usa mm/aa",
    dateExpired: "La tarjeta está vencida",
    cvv: "El CVV debe tener 3 o 4 dígitos",
    amountInvalid: "Monto no válido",
    amountMin: `El monto mínimo es ${MIN_AMOUNT}`,
    amountMax: `El monto máximo es ${MAX_AMOUNT.toLocaleString("en-US")}`,
    amountDecimals: "El monto admite máximo 2 decimales",
};

// The card is valid through the last day of its expiry month.
const isNotExpired = (value: string) => {
    const [month, year] = value.split("/").map(Number);
    // Date months are 0-based, so passing `month` yields the first day of the month after expiry.
    const firstDayAfterExpiry = new Date(2000 + year, month, 1);
    return firstDayAfterExpiry > new Date();
};

// Rounds to 6 decimals first to absorb floating point noise (e.g. 1.1 * 100 = 110.00000000000001),
// then checks that the value has no more than 2 decimals.
const hasAtMostTwoDecimals = (value: number) =>
    Number.isInteger(Math.round(value * 1e6) / 1e4);

const nameSchema = z.string().trim()
    .regex(NAME_REGEX, { error: messages.nameInvalid })
    .min(3, { error: messages.nameTooShort });

const cardNumberSchema = z.string().trim()
    .transform((value) => value.replace(/[\s-]/g, ""))
    .pipe(z.string().regex(CARD_NUMBER_REGEX, { error: messages.cardNumber }));

const expiryDateSchema = z.string().trim()
    .regex(EXPIRY_DATE_REGEX, { error: messages.dateFormat })
    .refine(isNotExpired, { error: messages.dateExpired });

const cvvSchema = z.string().trim()
    .regex(CVV_REGEX, { error: messages.cvv });

const amountSchema = z.coerce.number({ error: messages.amountInvalid })
    .min(MIN_AMOUNT, { error: messages.amountMin })
    .max(MAX_AMOUNT, { error: messages.amountMax })
    .refine(hasAtMostTwoDecimals, { error: messages.amountDecimals });

export const paymentSchema = z.object({
    name: nameSchema,
    cardNumber: cardNumberSchema,
    date: expiryDateSchema,
    cvv: cvvSchema,
    amount: amountSchema,
});

export type PaymentFormInput = z.input<typeof paymentSchema>;
export type PaymentFormValues = z.output<typeof paymentSchema>;
