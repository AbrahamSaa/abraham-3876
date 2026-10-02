export const PAYMENT_COPY = {
    trigger: "Recargar saldo",
    brand: "Snail pay",
    tagline: "Tu plataforma de pagos segura y confiable. Tan rapida como un caracol.",
    form: {
        amountLabel: "Monto de la recarga",
        cardSection: "Datos de tu tarjeta",
        nameLabel: "Titular de la tarjeta",
        namePlaceholder: "Nombre completo",
        cardNumberLabel: "Número de tarjeta",
        expiryLabel: "Fecha de expiración",
        expiryPlaceholder: "MM/AA",
        cvvLabel: "CVV",
        cancel: "Cancelar",
        genericError: "No se pudo procesar el pago. Intenta de nuevo.",
    },
    success: {
        title: "Pago exitoso",
        description: "Tu pago se ha realizado con éxito.",
        close: "Volver al dashboard",
    },
    fail: {
        title: "Error al procesar tu pago",
    },
    testCards: {
        title: "Tarjetas de prueba",
    },
} as const
