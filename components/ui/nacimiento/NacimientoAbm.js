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
import { initialValues, validationSchema } from "./NacimientoAbm.form";
import { useFormik } from "formik";
import { ApiNacimiento, ApiTipoRaza } from "../../../api";
import { Loading } from "../Loading";
import { useAuth } from "@/hooks";

const ApiNacimientoCtrl = new ApiNacimiento();
const ApiTipoRazaCtrl = new ApiTipoRaza();

export const NacimientoAbm = (props) => {
  const { setOpen, mode, dato, codId, setReload } = props;
  const { user } = useAuth();
  const establesimientoId = user.establesimiento.id;
  const [tipoRaza, setTipoRaza] = useState([]);

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
              tipo_raza: formValue.tipo_raza,
              peso: formValue.peso,
              sexo: formValue.sexo,
              tipo_Parto: formValue.tipo_Parto,
              nroCaravana: formValue.nroCaravana,
              nroCaravanaMadre: formValue.nroCaravanaMadre,
              establesimiento: establesimientoId,
              user_upd: user.username,
            },
          };
          await ApiNacimientoCtrl.postData(body);
          formik.handleReset();
          setReload(true);
          setOpen(false);
        } catch (error) {
          console.error(error);
        }
      }

      if (mode === "DLT") {
        try {
          await ApiNacimientoCtrl.delete(codId);
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
              tipo_raza: formValue.tipo_raza,
              peso: formValue.peso,
              sexo: formValue.sexo,
              tipo_Parto: formValue.tipo_Parto,
              nroCaravana: formValue.nroCaravana,
              nroCaravanaMadre: formValue.nroCaravanaMadre,
              establesimiento: establesimientoId,
              user_upd: user.username,
            },
          };

          await ApiNacimientoCtrl.update(body, codId);
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
      const response = await ApiTipoRazaCtrl.getAll(establesimientoId);
      const result = await response.data;
      setTipoRaza(result);
      setReload(false);
    })();
  }, []);

  if (!tipoRaza) {
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
              name="peso"
              fullWidth
              label="Peso Kg."
              value={formik.values.peso}
              onChange={formik.handleChange}
              error={formik.errors.peso}
              disabled={mode === "DLT" ? true : false}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="outlined"
              name="sexo"
              select
              fullWidth
              label="Sexo"
              value={formik.values.sexo}
              onChange={formik.handleChange}
              error={formik.errors.sexo}
              disabled={mode === "DLT" ? true : false}
            >
              <MenuItem key="Macho" value="Macho">
                Macho
              </MenuItem>
              <MenuItem key="Hembra" value="Hembra">
                Hembra
              </MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="outlined"
              name="tipo_Parto"
              select
              fullWidth
              label="Tipo de Parto"
              value={formik.values.tipo_Parto}
              onChange={formik.handleChange}
              error={formik.errors.tipo_Parto}
              disabled={mode === "DLT" ? true : false}
            >
              <MenuItem key="Normal" value="Normal">
                Normal
              </MenuItem>
              <MenuItem key="Distocico" value="Distocico">
                Distocico
              </MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="outlined"
              name="nroCaravana"
              fullWidth
              label={
                mode === "ADD"
                  ? "Nro Caravana"
                  : mode === "UPD"
                  ? "Nro Caravana"
                  : null
              }
              value={formik.values.nroCaravana}
              onChange={formik.handleChange}
              error={formik.errors.nroCaravana}
              disabled={mode === "DLT" ? true : false}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="outlined"
              name="nroCaravanaMadre"
              fullWidth
              label={
                mode === "ADD"
                  ? "Nro Caravana Madre"
                  : mode === "UPD"
                  ? "Nro Caravana Madre"
                  : null
              }
              value={formik.values.nroCaravanaMadre}
              onChange={formik.handleChange}
              error={formik.errors.nroCaravanaMadre}
              disabled={mode === "DLT" ? true : false}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="tipo_raza"
              fullWidth
              label="Tipo Raza"
              select
              value={formik.values.tipo_raza}
              onChange={formik.handleChange}
              error={formik.errors.tipo_raza}
              disabled={mode === "DLT" ? true : false}
            >
              {tipoRaza.map((dato) => {
                return (
                  <MenuItem key={dato.id} value={dato.id}>
                    {dato.attributes.nombre}
                  </MenuItem>
                );
              })}
            </TextField>
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
