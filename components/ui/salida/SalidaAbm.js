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
import { initialValues, validationSchema } from "./SalidaAbm.form";
import { useFormik } from "formik";
import { ApiSalida, Clasificacion, ApiMotivoSalida } from "../../../api";
import { Loading } from "../Loading";
import { useAuth } from "@/hooks";

const ApiSalidaCtrl = new ApiSalida();
const ApiMotivoSalidaCtrl = new ApiMotivoSalida();
const clasificacionCtrl = new Clasificacion();

export const SalidaAbm = (props) => {
  const { setOpen, mode, dato, codId, setReload } = props;
  const { user } = useAuth();
  const establesimientoId = user.establesimiento.id;
  const [clasificacion, setClasificacion] = useState([]);
  const [motivoSalida, setMotivoSalida] = useState([]);
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
              factura: formValue.factura,
              clasificacion: formValue.clasificacion,
              motivo_salida: formValue.motivo_salida,
              cantidad: formValue.cantidad,
              establesimiento: establesimientoId,
              user_upd: user.username,
            },
          };
          await ApiSalidaCtrl.postData(body);
          formik.handleReset();
          setReload(true);
          setOpen(false);
        } catch (error) {
          console.error(error);
        }
        try {
          console.log(formValue.clasificacion);
          let body = {
            data: {
              stock: parseInt(cantidadResta) - parseInt(formValue.cantidad),
            },
          };
          console.log(body);
          await clasificacionCtrl.update(body, formValue.clasificacion);
        } catch (error) {
          console.error(error);
        }
      }

      if (mode === "DLT") {
        try {
          await ApiSalidaCtrl.delete(codId);
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
              factura: formValue.factura,
              clasificacion: formValue.clasificacion,
              motivo_salida: formValue.motivo_salida,
              cantidad: formValue.cantidad,
              establesimiento: establesimientoId,
              user_upd: user.username,
            },
          };

          await ApiSalidaCtrl.update(body, codId);
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
      const response = await ApiMotivoSalidaCtrl.getAll(establesimientoId);
      const result = await response.data;
      setMotivoSalida(result);
    })();
  }, []);

  if (!clasificacion) {
    return <Loading />;
  }
  if (!motivoSalida) {
    return <Loading />;
  }

  const onMenuItemClick = (stock) => {
    setCantidadResta(stock);
  };

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
              name="factura"
              fullWidth
              label="Nro Factura/Documento"
              value={formik.values.factura}
              onChange={formik.handleChange}
              error={formik.errors.factura}
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
                  <MenuItem
                    key={dato.id}
                    value={dato.id}
                    onClick={() => onMenuItemClick(dato.attributes.stock)}
                  >
                    {dato.attributes.nombre}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="motivo_salida"
              required
              fullWidth
              label="Motivo Salida"
              select
              value={formik.values.motivo_salida}
              onChange={formik.handleChange}
              error={formik.errors.motivo_salida}
              disabled={mode === "DLT" ? true : false}
            >
              {motivoSalida.map((dato) => {
                return (
                  <MenuItem key={dato.id} value={dato.id}>
                    {dato.attributes.nombre}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>

          <Grid item xs={8}>
            <TextField
              variant="outlined"
              name="cantidad"
              fullWidth
              required
              label="Cantidad"
              value={formik.values.cantidad}
              onChange={formik.handleChange}
              error={formik.errors.cantidad}
              disabled={mode === "DLT" ? true : false}
              helperText={
                formik.errors.cantidad
                  ? "La Cantidad no puede ser negativa."
                  : null
              }
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              variant="outlined"
              name="Stock"
              fullWidth
              label="Stock Actual"
              value={cantidadResta}
              disabled
              error={formik.errors.stock}
              helperText={cantidadResta < 0 ? "1" : null}
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
