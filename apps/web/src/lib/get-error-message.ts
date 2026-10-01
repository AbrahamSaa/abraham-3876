export const getErrorMessage = (error: unknown, fallback = "Ocurrió un error inesperado, vuelve a intentarlo") =>
    error instanceof Error ? error.message : fallback
