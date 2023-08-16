import React, { useState } from "react";

import {
  Divider,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./UpdateDelete.form";
import { Clasificacion } from "../../../api";
import { useAuth } from "../../../hooks";

const clasificacionCtrl = new Clasificacion();

export const UpdateDelete = (props) => {
  const { setOpen, mode, codId, nombre, precio, setReload, dosAnhos } = props;
  const { user } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(nombre, precio, dosAnhos),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      switch (mode) {
        case "UPD":
          let body = {
            data: {
              nombre: formValue.nombre,
              precio: formValue.precio,
              dosAnhos: formValue.dosAnhos,
              user_upd: user.username,
            },
          };
          await clasificacionCtrl.update(body, codId);
          break;
        case "DLT":
          await clasificacionCtrl.delete(codId);
          break;
      }
      setReload(true);
      setOpen(false);
    },
  });

  return (
    <>
      <Typography variant="h6" component="h2">
        {mode === "UPD" ? `Actualizar Datos` : `Eliminar Datos`}
      </Typography>
      <Divider />
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              name="nombre"
              required
              fullWidth
              label="Clasificacion"
              autoFocus //={mode === "DLT" ? false : true}
              value={formik.values.nombre}
              onChange={formik.handleChange}
              error={formik.errors.nombre}
              disabled={mode === "UPD" ? false : true}
              helperText={formik.errors.nombre ? "Campo Obligatorio" : null}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="filled"
              name="dosAnhos"
              select
              fullWidth
              label="Dos Años"
              value={formik.values.dosAnhos}
              onChange={formik.handleChange}
              error={formik.errors.dosAnhos}
              disabled={mode === "UPD" ? false : true}
            >
              <MenuItem key="Mayor" value="Mayor">
                Mayor
              </MenuItem>
              <MenuItem key="Menor" value="Menor">
                Menor
              </MenuItem>
              <MenuItem key="Recien Nacido" value="Recien Nacido">
                Recien Nacido
              </MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="filled"
              name="precio"
              required
              type="number"
              fullWidth
              label="Precio Estimado"
              autoFocus={mode === "DLT" ? false : true}
              value={formik.values.precio}
              onChange={formik.handleChange}
              error={formik.errors.precio}
              disabled={mode === "UPD" ? false : true}
              helperText={formik.errors.precio ? "Campo Obligatorio" : null}
            />
          </Grid>
          <Grid container mt="15px">
            <Grid Item xs={6} pr="15px">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 10 }}
                color={mode === "DLT" ? "error" : "primary"}
              >
                {mode === "UPD" ? `Actualizar` : `Eliminar`}
              </Button>
            </Grid>
            <Grid Item xs={6} pl="15px">
              <Button
                //type="submit"
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
