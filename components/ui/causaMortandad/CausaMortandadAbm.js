import React from "react";
import {
  Divider,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { initialValues, validationSchema } from "./CausaMortandadAbm.form";
import { useFormik } from "formik";
import { ApiCausaMort } from "../../../api";
import { useAuth } from "../../../hooks";

const ApiCausaMortCtrl = new ApiCausaMort();

export const CausaMortandadAbm = (props) => {
  const { setOpen, mode, codId, nombre, setReload } = props;
  const { user } = useAuth();
  const establesimientoId = user?.establesimiento.id;
  const formik = useFormik({
    initialValues: initialValues(nombre),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (mode === "ADD") {
        try {
          let body = {
            data: {
              nombre: formValue.nombre,
              establesimiento: establesimientoId,
              user_upd: user.username,
            },
          };
          await ApiCausaMortCtrl.postCausaMortandad(body);
          formik.handleReset();
          setReload(true);
          setOpen(false);
        } catch (error) {
          console.error(error);
        }
      }

      if (mode === "DLT") {
        try {
          await ApiCausaMortCtrl.delete(codId);
          formik.handleReset();
          setReload(true);
          setOpen(false);
        } catch (error) {
          console.error(error);
        }
      }
      if (mode === "UPD") {
        try {
          let body = {
            data: {
              nombre: formValue.nombre,
              user_upd: user.username,
            },
          };
          await ApiCausaMortCtrl.update(body, codId);
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
      <Typography variant="h6" component="h2">
        {mode === "UPD" ? `Actualizar Datos` : null}
        {mode === "ADD" ? `Nueva Causa Mortandad` : null}
        {mode === "DLT" ? `Desea eliminar este dato?` : null}
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
              label={
                mode === "ADD"
                  ? "Nueva Causa"
                  : mode === "UPD"
                  ? "Actulizar Causa"
                  : null
              }
              autoFocus={mode === "DLT" ? false : true}
              value={formik.values.nombre}
              onChange={formik.handleChange}
              error={formik.errors.nombre}
              disabled={mode === "DLT" ? true : null}
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
                {mode === "UPD" ? `Actualizar` : null}
                {mode === "ADD" ? `Agregar` : null}
                {mode === "DLT" ? `Eliminar` : null}
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
