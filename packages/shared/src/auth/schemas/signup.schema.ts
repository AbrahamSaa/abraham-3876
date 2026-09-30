import { z } from "zod";

export const signupSchema =
    z.object({
        name: z.string().trim().min(2, {
            error: "El nombre debe tener al menos 2 caracteres"
        }),
        email: z.email({
            error: "Email no valido"
        }).trim().toLowerCase(),
        password: z.string().trim().min(8, {
            error: "La contraseña debe tener al menos 8 caracteres"
        }),
        confirmPassword: z.string().trim().nonempty({
            error: "Confirma tu contraseña"
        }),
    }).refine((data) => data.password === data.confirmPassword, {
        error: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

export type SignupFormValues = z.infer<typeof signupSchema>;
