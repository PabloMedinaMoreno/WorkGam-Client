import React from "react";
import { TextField, MenuItem } from "@mui/material";

const WorkerForm = ({ register, errors, watch, roles, selectedWorker }) => {
  return (
    <>
      <TextField
        {...register("username", { required: "El nombre de usuario es obligatorio" })}
        label="Nombre de Usuario"
        fullWidth
        margin="normal"
        error={!!errors.username}
        helperText={errors.username?.message}
      />
      <TextField
        {...register("email", { required: "El email es obligatorio" })}
        label="Email"
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      {/* Only display password and gender fields when creating a new worker */}
      {!selectedWorker && (
        <>
          <TextField
            {...register("password", { required: "La contraseña es obligatoria" })}
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            {...register("gender", { required: "Selecciona un género" })}
            label="Género"
            select
            fullWidth
            margin="normal"
            value={watch("gender") || ""}
            error={!!errors.gender}
            helperText={errors.gender?.message}
          >
            <MenuItem value="">Seleccione una opción</MenuItem>
            <MenuItem value="male">Masculino</MenuItem>
            <MenuItem value="female">Femenino</MenuItem>
          </TextField>
        </>
      )}
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
        {...register("phone")}
        label="Teléfono (opcional)"
        fullWidth
        margin="normal"
      />
    </>
  );
};

export default WorkerForm;
