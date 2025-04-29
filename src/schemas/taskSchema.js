import { z } from "zod";

export const taskSchema = z.object({
  name: z.string().min(1, { message: "El nombre de la tarea es obligatorio" }),
  description: z.string().min(1, { message: "La descripción es obligatoria" }),
  xp: z.preprocess((val) => {
    if (typeof val === "string" || typeof val === "number") {
      return parseInt(val, 10);
    }
    return NaN;
  }, z.number().min(1, { message: "El XP debe ser un número mayor a 0" })),
  role_id: z.number().min(1, { message: "El rol es obligatorio" }),
  estimated_duration_days: z.preprocess((val) => {
    if (typeof val === "string" || typeof val === "number") {
      return parseInt(val, 10);
    }
    return NaN;
  }, z.number().min(1, { message: "La duración estimada debe ser un número mayor a 0" })),
  difficulty: z.enum(["easy", "medium", "hard"], {
    message: "La dificultad debe ser 'facil', 'medio' o 'difícil'",
  }),
});
