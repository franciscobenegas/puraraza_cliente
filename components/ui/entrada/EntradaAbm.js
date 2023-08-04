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
import { initialValues, validationSchema } from "./EntradaAbm.form";
import { useFormik } from "formik";
import { ApiEntrada, Clasificacion, ApiMotivoEntrada } from "../../../api";
import { Loading } from "../Loading";
import { useAuth } from "@/hooks";

const ApiEntradaCtrl = new ApiEntrada();
const ApiMotivoEntradaCtrl = new ApiMotivoEntrada();
const clasificacionCtrl = new Clasificacion();

export const EntradaAbm = (props) => {
  const { setOpen, mode, dato, codId, setReload } = props;
  const { user } = useAuth();
  const establesimientoId = user?.establesimiento.id;
  const [cantidadAdd, setCantidadAdd] = useState(0);
  const [clasificacion, setClasificacion] = useState([]);
  const [motivoEntrada, setMotivoEntrada] = useState([]);

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
              motivo_entrada: formValue.motivo_entrada,
              cantidad: formValue.cantidad,
              establesimiento: establesimientoId,
              user_upd: user.username,
            },
          };

          await ApiEntradaCtrl.postData(body);
          formik.handleReset();
          setReload(true);
          setOpen(false);
        } catch (error) {
          console.error(error);
        }

        try {
          let body = {
            data: {
              stock: parseInt(cantidadAdd) + parseInt(formValue.cantidad),
            },
          };

          await clasificacionCtrl.update(body, formValue.clasificacion);
        } catch (error) {
          console.error(error);
        }
      }

      if (mode === "DLT") {
        try {
          await ApiEntradaCtrl.delete(codId);
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
              motivo_entrada: formValue.motivo_entrada,
              cantidad: formValue.cantidad,
              establesimiento: establesimientoId,
              user_upd: user.username,
            },
          };

          await ApiEntradaCtrl.update(body, codId);
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
      const response = await ApiMotivoEntradaCtrl.getAll(establesimientoId);
      const result = await response.data;
      setMotivoEntrada(result);
    })();
  }, []);

  if (!clasificacion) {
    return <Loading />;
  }
  if (!motivoEntrada) {
    return <Loading />;
  }

  const onMenuItemClick = (stock) => {
    setCantidadAdd(stock);
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
              name="motivo_entrada"
              required
              fullWidth
              label="Motivo Entrada"
              select
              value={formik.values.motivo_entrada}
              onChange={formik.handleChange}
              error={formik.errors.motivo_entrada}
              disabled={mode === "DLT" ? true : false}
            >
              {motivoEntrada.map((dato) => {
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
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              variant="outlined"
              name="Stock"
              fullWidth
              label="Stock Actual"
              value={cantidadAdd}
              disabled
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
