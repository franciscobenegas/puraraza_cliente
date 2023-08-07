import React, { useState, useEffect } from "react";
import {
  Divider,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Hidden,
  Container,
} from "@mui/material";
import { initialValues, validationSchema } from "./UsuarioAbm.form";
import { useFormik } from "formik";
import { ApiNewUser, ApiUsuario } from "../../../api";
import { useAuth } from "@/hooks";

const ApiNewUserCtrl = new ApiNewUser();
const ApiUsauarioCtrl = new ApiUsuario();

export const UsuarioAbm = (props) => {
  const { setOpen, mode, dato, codId, setReload } = props;
  const { user } = useAuth();
  const establesimientoId = user.establesimiento.id;
  const { data } = dato;

  const formik = useFormik({
    initialValues: initialValues(data),
    validationSchema: validationSchema(mode),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (mode === "ADD") {
        try {
          await ApiNewUserCtrl.register(formValue);
          formik.handleReset();
          setReload(true);
          setOpen(false);
        } catch (error) {
          console.error(error);
        }
      }

      if (mode === "DLT") {
        try {
          let body = {
            blocked: true,
          };
          await ApiUsauarioCtrl.update(body, codId);
          setReload(true);
          setOpen(false);
        } catch (error) {
          console.error(error);
        }
      }

      if (mode === "UPD") {
        try {
          let body = {
            password: formValue.password,
          };
          await ApiUsauarioCtrl.update(body, codId);
          setReload(true);
          setOpen(false);
        } catch (error) {
          console.error(error);
        }
      }
    },
  });

  return (
    <>
      <Typography variant="h6" component="h2" mb={2}>
        {mode === "UPD" ? `Cambiar Contraseña` : null}
        {mode === "ADD" ? `Nuevo Registro` : null}
        {mode === "DLT" ? `Desea deshabilitar el acceso al Usuario?` : null}
      </Typography>
      <Divider />
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          {mode !== "UPD" ? (
            <Grid item xs={6}>
              <TextField
                type="text"
                variant="outlined"
                name="nombre"
                autoFocus
                fullWidth
                label="Nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                error={formik.errors.nombre}
                disabled={mode === "DLT" ? true : false}
                helperText={
                  formik.errors.nombre ? "Debe cargar un valor" : null
                }
              />
            </Grid>
          ) : (
            false
          )}

          {mode !== "UPD" ? (
            <Grid item xs={6}>
              <TextField
                type="text"
                variant="outlined"
                name="apellido"
                fullWidth
                label="Apellido"
                value={formik.values.apellido}
                onChange={formik.handleChange}
                error={formik.errors.apellido}
                disabled={mode === "DLT" ? true : false}
                helperText={
                  formik.errors.apellido ? "Debe cargar un valor" : null
                }
              />
            </Grid>
          ) : (
            false
          )}

          {mode !== "UPD" ? (
            <Grid item xs={12}>
              <TextField
                type="text"
                variant="outlined"
                name="email"
                required
                fullWidth
                label="Correo Electronico"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
                disabled={mode === "DLT" ? true : false}
                helperText={formik.errors.email ? "Debe cargar un valor" : null}
              />
            </Grid>
          ) : (
            false
          )}

          {mode !== "UPD" ? (
            <Grid item xs={12}>
              <TextField
                type="text"
                variant="outlined"
                name="username"
                required
                fullWidth
                label="Nombre Usuario"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.errors.username}
                disabled={mode === "DLT" ? true : false}
                helperText={
                  formik.errors.username ? "Debe cargar un valor" : null
                }
              />
            </Grid>
          ) : (
            false
          )}

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="password"
              type="password"
              required
              fullWidth
              label={mode === "UPD" ? "Nueva Contraseña" : "Contraseña"}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
              disabled={mode === "DLT" ? true : false}
              helperText={
                formik.errors.password
                  ? "La Contraseña debe tener mas de 6 dígitos "
                  : null
              }
            />
          </Grid>

          {mode !== "UPD" ? (
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                name="rol"
                required
                select
                fullWidth
                label="Rol"
                value={formik.values.rol}
                onChange={formik.handleChange}
                error={formik.errors.rol}
                helperText={
                  formik.errors.rol ? "Debe seleccionar un valor" : null
                }
                disabled={mode === "DLT" ? true : false}
              >
                <MenuItem key="Administrador" value="Administrador">
                  Administrador
                </MenuItem>
                <MenuItem key="Capataz" value="Capataz">
                  Capataz
                </MenuItem>
              </TextField>
            </Grid>
          ) : (
            false
          )}

          <Grid container mt="15px">
            <Grid Item xs={6} pr="15px">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 10 }}
                color={mode === "DLT" ? "warning" : "primary"}
              >
                {mode === "UPD" ? `Actualizar` : null}
                {mode === "ADD" ? `Agregar` : null}
                {mode === "DLT" ? `Deshabilitar ` : null}
              </Button>
            </Grid>
            <Grid Item xs={6} pl="15px">
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2, borderRadius: 10 }}
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
