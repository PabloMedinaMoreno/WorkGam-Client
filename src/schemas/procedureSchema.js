import { z } from "zod";

/**
 * Schema for creating a new procedure.
 *
 * This schema validates that both the title and description are provided
 * and are non-empty strings.
 *
 * @constant {import("zod").ZodSchema<{ name: string, description: string }>}
 */
export const createProcedureSchema = z.object({
  name: z.string().min(1, {
    message: "El título del trámite es obligatorio y no puede quedar vacío.",
  }),
  description: z.string().min(1, {
    message:
      "La descripción del trámite es obligatoria y no puede quedar vacía.",
  }),
});

/**
 * Schema for updating an existing procedure.
 *
 * This schema validates that both the title and description are provided
 * and are non-empty strings.
 *
 * @constant {import("zod").ZodSchema<{ name: string, description: string }>}
 */
export const updateProcedureSchema = z.object({
  name: z.string().min(1, {
    message: "El título del trámite es obligatorio y no puede quedar vacío.",
  }),
  description: z.string().min(1, {
    message:
      "La descripción del trámite es obligatoria y no puede quedar vacía.",
  }),
});
