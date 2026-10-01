const FORMATTER_MXN = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
});

export const formatCurrency = (value: unknown) => {
    const numberValue = typeof value === "number" ? value : parseFloat(String(value ?? ""));
    return FORMATTER_MXN.format(Number.isFinite(numberValue) ? numberValue : 0);
};
