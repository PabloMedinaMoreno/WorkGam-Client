import { z } from "zod";

/**
 * Schema for creating or updating a role.
 *
 * Validates that both the name and description are provided as non-empty strings.
 *
 * @constant {import("zod").ZodSchema<{ name: string, description: string }>}
 */
export const roleSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  description: z.string().min(1, { message: "La descripción es obligatoria" }),
});
