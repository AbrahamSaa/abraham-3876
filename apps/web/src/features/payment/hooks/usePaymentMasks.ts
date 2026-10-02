import { format, useMask } from "@react-input/mask"

const digitMask = (mask: string) => ({ mask, replacement: { _: /\d/ } })

const CARD_MASK = digitMask("____ ____ ____ ____")
const EXP_DATE_MASK = digitMask("__/__")

// The mask rejects unformatted initial values, so format raw values before they reach the input
export const formatCardNumber = (value: string) => (value ? format(value, CARD_MASK) : "")
export const formatExpDate = (value: string) => (value ? format(value, EXP_DATE_MASK) : "")

export const usePaymentMasks = () => ({
    cardMask: useMask(CARD_MASK),
    expDateMask: useMask(EXP_DATE_MASK),
    cvvMask: useMask(digitMask("____")),
})
