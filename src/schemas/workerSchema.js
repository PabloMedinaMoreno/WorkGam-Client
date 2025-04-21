import { z } from "zod";

/**
 * Schema for creating or updating a worker.
 *
 * Validates the worker fields: username, email, password, role_id, and gender.
 *
 * @constant {import("zod").ZodSchema<{ username: string, email: string, password: string, role_id: number, gender: string }>}
 */
export const workerSchema = z.object({
  username: z
    .string()
    .min(1, { message: "El nombre de usuario es obligatorio" }),
  email: z.string().email({ message: "El correo electrónico debe ser válido" }),
  password: z.string().min(5, "La contraseña debe tener al menos 5 caracteres").optional(),
  role_id: z.number().min(1, { message: "El rol es obligatorio" }),
  gender: z.enum(["male", "female"], {
    message: "El género debe ser 'male' o 'female'",
  }),
});
