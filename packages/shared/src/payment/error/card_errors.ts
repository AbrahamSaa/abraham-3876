export const CardErrorStatus = {
    BAD_REQUEST: 4000,
    SNAIL_PAY_ERROR: 4001,
    INSUFFICIENT_FUNDS: 4002,
    TIMEOUT: 4003,
    INVALID_EXPIRATION_DATE: 4004,
    INVALID_SECURITY_CODE: 4005,
    SYSTEM_ERROR: 5000,
} as const;

export type CardErrorStatus = (typeof CardErrorStatus)[keyof typeof CardErrorStatus];

export const CardErrors: Record<number, string> = {
    [CardErrorStatus.BAD_REQUEST]: "Error en la solicitud. Por favor, verifica los datos ingresados.",
    [CardErrorStatus.SNAIL_PAY_ERROR]: "Tu tarjeta fue rechazada por SnailPay. Intenta con otra tarjeta.",
    [CardErrorStatus.INSUFFICIENT_FUNDS]: "Saldo insuficiente. Por favor, verifica tu saldo o utiliza otro método de pago.",
    [CardErrorStatus.TIMEOUT]: "Esto tomó más tiempo de lo esperado. Por favor, intenta nuevamente.",
    [CardErrorStatus.INVALID_EXPIRATION_DATE]: "La fecha de vencimiento no coincide con la tarjeta.",
    [CardErrorStatus.INVALID_SECURITY_CODE]: "El CVV no coincide con la tarjeta.",
    [CardErrorStatus.SYSTEM_ERROR]: "SnailPay no está disponible por el momento. No se realizó ningún cargo, intenta más tarde.",
};
