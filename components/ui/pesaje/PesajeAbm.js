import React, { useState, useEffect } from "react";
import {
  Divider,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { initialValues, validationSchema } from "./PesajeAbm.form";
import { useFormik } from "formik";
import {
  ApiSalida,
  Clasificacion,
  ApiMotivoSalida,
  ApiMotivoPesaje,
  ApiPesaje,
} from "../../../api";
import { Loading } from "../Loading";
import { useAuth } from "@/hooks";

const ApiSalidaCtrl = new ApiSalida();
const ApiMotivoSalidaCtrl = new ApiMotivoSalida();
const clasificacionCtrl = new Clasificacion();
const ApiPesajeCtrl = new ApiPesaje();
const ApiMotivoPesajeCtrl = new ApiMotivoPesaje();

export const PesajeAbm = (props) => {
  const { setOpen, mode, dato, codId, setReload } = props;
  const { user } = useAuth();
  const establesimientoId = user.establesimiento.id;
  const [clasificacion, setClasificacion] = useState([]);
  const [motivoSalida, setMotivoSalida] = useState([]);
  const [motivoPesaje, setMotivoPesaje] = useState([]);
  const [cantidadResta, setCantidadResta] = useState(0);

  const formik = useFormik({
    initialValues: initialValues(dato),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (mode === "ADD") {
        try {
          let body = {
            data: {
              fecha: formValue.fecha,
              caravana: formValue.caravana,
              clasificacion: formValue.clasificacion,
              motivo_pesaje: formValue.motivo_pesaje,
              peso: formValue.peso,
              establesimiento: establesimientoId,
              user_upd: user.username,
            },
          };
          await ApiPesajeCtrl.postData(body);
          formik.handleReset();
          setReload(true);
          setOpen(false);
        } catch (error) {
          console.error(error);
        }
      }

      if (mode === "DLT") {
        try {
          await ApiPesajeCtrl.delete(codId);
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
              fecha: formValue.fecha,
              caravana: formValue.caravana,
              clasificacion: formValue.clasificacion,
              motivo_pesaje: formValue.motivo_pesaje,
              peso: formValue.peso,
              establesimiento: establesimientoId,
              user_upd: user.username,
            },
          };

          await ApiPesajeCtrl.update(body, codId);
          setReload(true);
          setOpen(false);
        } catch (error) {
          console.error(error);
        }
      }
    },
  });

  useEffect(() => {
    (async () => {
      const response = await clasificacionCtrl.getClasificacion(
        establesimientoId
      );
      const result = await response.data;
      setClasificacion(result);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await ApiMotivoPesajeCtrl.getAll(establesimientoId);
      const result = await response.data;
      setMotivoPesaje(result);
    })();
  }, []);

  if (!clasificacion) {
    return <Loading />;
  }
  if (!motivoPesaje) {
    return <Loading />;
  }

  return (
    <>
      <Typography variant="h6" component="h2">
        {mode === "UPD" ? `Actualizar Datos` : null}
        {mode === "ADD" ? `Nuevo Registro` : null}
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
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              name="fecha"
              required
              fullWidth
              label="Fecha"
              type="date"
              autoFocus
              value={formik.values.fecha}
              onChange={formik.handleChange}
              error={formik.errors.fecha}
              disabled={mode === "DLT" ? true : false}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="outlined"
              name="caravana"
              fullWidth
              label="#Caravana"
              value={formik.values.caravana}
              onChange={formik.handleChange}
              error={formik.errors.caravana}
              disabled={mode === "DLT" ? true : false}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="clasificacion"
              fullWidth
              label="Clasificaicon"
              required
              select
              value={formik.values.clasificacion}
              onChange={formik.handleChange}
              error={formik.errors.clasificacion}
              disabled={mode === "DLT" ? true : false}
            >
              {clasificacion.map((dato) => {
                return (
                  <MenuItem key={dato.id} value={dato.id}>
                    {dato.attributes.nombre}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="motivo_pesaje"
              required
              fullWidth
              label="Motivo Pesaje"
              select
              value={formik.values.motivo_pesaje}
              onChange={formik.handleChange}
              error={formik.errors.motivo_pesaje}
              disabled={mode === "DLT" ? true : false}
            >
              {motivoPesaje.map((dato) => {
                return (
                  <MenuItem key={dato.id} value={dato.id}>
                    {dato.attributes.nombre}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="peso"
              fullWidth
              required
              label="Pesaje"
              value={formik.values.peso}
              onChange={formik.handleChange}
              error={formik.errors.peso}
              disabled={mode === "DLT" ? true : false}
              helperText={
                formik.errors.cantidad
                  ? "El Pesaje no puede ser negativa."
                  : null
              }
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
