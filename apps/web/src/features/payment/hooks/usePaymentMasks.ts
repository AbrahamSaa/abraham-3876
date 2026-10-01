import { useMask } from "@react-input/mask"

const digitMask = (mask: string) => ({ mask, replacement: { _: /\d/ } })

export const usePaymentMasks = () => ({
    cardMask: useMask(digitMask("____ ____ ____ ____")),
    expDateMask: useMask(digitMask("__/__")),
    cvvMask: useMask(digitMask("____")),
})
