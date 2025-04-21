import React from "react";
import { TextField, MenuItem } from "@mui/material";

const TaskForm = ({ register, errors, watch, roles }) => {
  return (
    <>
      <TextField
        {...register("name", { required: "El nombre es obligatorio" })}
        label="Nombre"
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("description", { required: "La descripción es obligatoria" })}
        label="Descripción"
        fullWidth
        margin="normal"
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <TextField
        {...register("role_id", { required: "El rol es obligatorio" })}
        label="Rol"
        select
        fullWidth
        margin="normal"
        value={watch("role_id") || ""}
        error={!!errors.role_id}
        helperText={errors.role_id?.message}
      >
        <MenuItem value="">Seleccione un rol</MenuItem>
        {roles.map((role) => (
          <MenuItem key={role.id} value={role.id}>
            {role.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        {...register("xp", {
          required: "XP es obligatorio",
          valueAsNumber: true, // Ensure the value is treated as a number
        })}
        label="XP"
        fullWidth
        margin="normal"
        error={!!errors.xp}
        helperText={errors.xp?.message}
        type="number"
      />
      <TextField
        {...register("estimated_duration_days", {
          required: "La duración es obligatoria",
          valueAsNumber: true, // Ensure the value is treated as a number
        })}
        label="Duración estimada (días)"
        fullWidth
        margin="normal"
        error={!!errors.estimated_duration_days}
        helperText={errors.estimated_duration_days?.message}
        type="number"
      />
      <TextField
        {...register("difficulty", { required: "La dificultad es obligatoria" })}
        label="Dificultad"
        select
        fullWidth
        margin="normal"
        defaultValue="medium"
        error={!!errors.difficulty}
        helperText={errors.difficulty?.message}
      >
        <MenuItem value="easy">Fácil</MenuItem>
        <MenuItem value="medium">Medio</MenuItem>
        <MenuItem value="hard">Difícil</MenuItem>
      </TextField>
    </>
  );
};

export default TaskForm;
