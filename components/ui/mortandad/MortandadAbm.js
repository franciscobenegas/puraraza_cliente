import React, { useState, useEffect } from "react";
import {
  Divider,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Input,
} from "@mui/material";
import { initialValues, validationSchema } from "./MortandadAbm.form";
import { useFormik } from "formik";
import {
  ApiMortandad,
  Clasificacion,
  ApiCausaMort,
  ApiMovimientos,
} from "../../../api";
import { Loading } from "../Loading";
import { useAuth } from "../../../hooks";

const ApiMortandadCtrl = new ApiMortandad();
const clasificacionCtrl = new Clasificacion();
const causaMortandadCtrl = new ApiCausaMort();
const movimientosCtrl = new ApiMovimientos();

export const MortandadAbm = (props) => {
  const { setOpen, mode, dato, codId, setReload } = props;
  const { user } = useAuth();
  const establesimientoId = user?.establesimiento.id;
  const [classi, setclassi] = useState([]);
  const [causaMortandad, setCausaMortandad] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
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
              NroCaravana: formValue.NroCaravana,
              NroCaravanaMadre: formValue.NroCaravanaMadre,
              NroCaravanaPadre: formValue.NroCaravanaPadre,
              clasificacion: formValue.clasificacion,
              causa_mortandad: formValue.causa_mortandad,
              establesimiento: establesimientoId,
              user_upd: user.username,
            },
          };
          await ApiMortandadCtrl.postData(body);

          try {
            let body = {
              data: {
                stock: parseInt(cantidadResta) - 1,
              },
            };
            await clasificacionCtrl.update(body, formValue.clasificacion);
          } catch (error) {
            console.error(error);
          }

          try {
            let body = {
              data: {
                fecha: new Date().toISOString().slice(0, 10),
                tipoMovimiento: "Mortandad",
                cantidad: 1,
                user_upd: user.username,
                stockActual: parseInt(cantidadResta),
                establesimiento: establesimientoId,
                clasificacion: formValue.clasificacion,
              },
            };
            await movimientosCtrl.postData(body);
          } catch (error) {
            console.error(error);
          }

          formik.handleReset();
          setReload(true);
          setOpen(false);
        } catch (error) {
          console.error(error);
        }
      }

      if (mode === "DLT") {
        try {
          await ApiMortandadCtrl.delete(codId);
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
              NroCaravana: formValue.NroCaravana,
              NroCaravanaMadre: formValue.NroCaravanaMadre,
              NroCaravanaPadre: formValue.NroCaravanaPadre,
              clasificacion: formValue.clasificacion,
              causa_mortandad: formValue.causa_mortandad,
              user_upd: user.username,
            },
          };

          await ApiMortandadCtrl.update(body, codId);
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
      setclassi(result);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await causaMortandadCtrl.getCausaMort(establesimientoId);
      const result = await response.data;
      setCausaMortandad(result);
      setReload(false);
    })();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      console.log(selectedImage.name);
      setImageUrl(URL.createObjectURL(selectedImage));
      console.log(imageUrl);
    }
  }, [selectedImage]);

  if (!classi) {
    return <Loading />;
  }

  if (!causaMortandad) {
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
              autoFocus={mode === "DLT" ? false : true}
              value={formik.values.fecha}
              onChange={formik.handleChange}
              error={formik.errors.fecha}
              helperText={formik.errors.fecha ? "Debe cargar un valor" : null}
              disabled={mode === "DLT" ? true : false}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              name="NroCaravana"
              fullWidth
              label={
                mode === "ADD"
                  ? "Nro Caravana"
                  : mode === "UPD"
                  ? "Nro Caravana"
                  : null
              }
              value={formik.values.NroCaravana}
              onChange={formik.handleChange}
              error={formik.errors.NroCaravana}
              disabled={mode === "DLT" ? true : false}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="outlined"
              name="NroCaravanaMadre"
              fullWidth
              label={
                mode === "ADD"
                  ? "Nro Caravana Madre"
                  : mode === "UPD"
                  ? "Nro Caravana Madre"
                  : null
              }
              value={formik.values.NroCaravanaMadre}
              onChange={formik.handleChange}
              error={formik.errors.NroCaravanaMadre}
              disabled={mode === "DLT" ? true : false}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="outlined"
              name="NroCaravanaPadre"
              fullWidth
              label={
                mode === "ADD"
                  ? "Nro Caravana Padre"
                  : mode === "UPD"
                  ? "Nro Caravana Padre"
                  : null
              }
              value={formik.values.NroCaravanaPadre}
              onChange={formik.handleChange}
              error={formik.errors.NroCaravanaPadre}
              disabled={mode === "DLT" ? true : false}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="clasificacion"
              fullWidth
              label="Clasificaicon"
              select
              value={formik.values.clasificacion}
              onChange={formik.handleChange}
              error={formik.errors.clasificacion}
              helperText={
                formik.errors.clasificacion ? "Debe seleccionar un valor" : null
              }
              disabled={mode === "DLT" ? true : false}
            >
              {classi.map((dato) => {
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
              name="causa_mortandad"
              fullWidth
              label="Causa Mortandad"
              select
              value={formik.values.causa_mortandad}
              onChange={formik.handleChange}
              error={formik.errors.causa_mortandad}
              helperText={
                formik.errors.causa_mortandad
                  ? "Debe seleccionar un valor"
                  : null
              }
              disabled={mode === "DLT" ? true : false}
            >
              {causaMortandad.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.attributes.nombre}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="image"
              fullWidth
              //label="Imagen"
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              //value={formik.values.causa_mortandad}
              //onChange={formik.handleChange}
              //error={formik.errors.causa_mortandad}
              //disabled={mode === "DLT" ? true : false}
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
