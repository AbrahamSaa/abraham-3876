import { z } from "zod";

export const loginSchema =
    z.object({
        email: z.email({
            error: "Email no valido"
        }).trim().toLowerCase(),
        password: z.string().trim().nonempty({
            error: "La contraseña no debe ser vacia"
        }),
    });

export type LoginFormValues = z.infer<typeof loginSchema>;