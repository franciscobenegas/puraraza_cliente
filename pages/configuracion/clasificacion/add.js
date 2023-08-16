import React from "react";
import { ResponsiveDrawer } from "../../../components/layouts";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  initialValues,
  validationSchema,
} from "../../../components/ui/clasificacion/add.form.js";
import { useFormik } from "formik";
import { Clasificacion } from "../../../api";
import { useAuth } from "../../../hooks";
import { useRouter } from "next/router";

const clasificacionCtrl = new Clasificacion();

const AddPageClasificacion = () => {
  const { user } = useAuth();
  const establesimientoId = user.establesimiento.id;
  const router = useRouter();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await clasificacionCtrl.postClasificacion(
          formValue,
          establesimientoId,
          user.username
        );
        router.push("/configuracion/clasificacion");
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onCancel = () => {
    router.push("/configuracion/clasificacion");
  };

  return (
    <ResponsiveDrawer>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Nueva Clasificacion
          </Typography>

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
                  autoComplete="given-name"
                  name="nombre"
                  required
                  fullWidth
                  label="Clasificacion"
                  autoFocus
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  error={formik.errors.nombre}
                  elperText={formik.errors.nombre ? "Campo Obligatorio" : null}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  name="dosAnhos"
                  required
                  select
                  fullWidth
                  label="Dos Años"
                  value={formik.values.dosAnhos}
                  onChange={formik.handleChange}
                  error={formik.errors.dosAnhos}
                  elperText={
                    formik.errors.dosAnhos ? "Campo Obligatorio" : null
                  }
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
                  autoComplete="given-name"
                  name="precio"
                  fullWidth
                  label="Precio Estimado"
                  value={formik.values.precio}
                  onChange={formik.handleChange}
                  error={formik.errors.precio}
                />
              </Grid>
              <Grid container mt="15px">
                <Grid Item xs={6} pr="15px">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, borderRadius: 10 }}
                  >
                    Aceptar
                  </Button>
                </Grid>
                <Grid Item xs={6} pl="15px">
                  <Button
                    //type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2, borderRadius: 10 }}
                    onClick={() => onCancel()}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ResponsiveDrawer>
  );
};

export default AddPageClasificacion;
