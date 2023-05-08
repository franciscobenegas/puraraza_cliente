import React from "react";
import { useAuth } from "@/hooks";
import { ResponsiveDrawer } from "@/components/layouts";
import {
  Container,
  Stack,
  Typography,
  Divider,
  Grid,
  Box,
  TextField,
  Button,
} from "@mui/material";
import {
  initialValues,
  validationSchema,
} from "../../../components/ui/establesimiento/EstablesimientoAbm.form";
import { useFormik } from "formik";
import { ApiEstablesimiento } from "@/api/apiEstablesimiento";
import { toast, ToastContainer } from "react-toastify";

const ApiEstablesimientoCtrl = new ApiEstablesimiento();
const notify = () => {
  toast.success("Datos Actualizado exitosamente!!!", {
    position: toast.POSITION.TOP_RIGHT,
    theme: "colored",
  });
};

const notifyError = () => {
  toast.error("Error en la Actualizacion, consulte con el Administrador...", {
    position: toast.POSITION.TOP_RIGHT,
    theme: "colored",
  });
};

const recargar = () => {
  window.location.reload(true);
};

const EstablesimientoPage = () => {
  const { user } = useAuth();
  const establesimientoId = user.establesimiento?.id;
  const userId = user.id;

  let body = {
    data: {
      nombre: user.establesimiento?.nombre || "",
      ruc: user.establesimiento?.ruc || "",
      direccion: user.establesimiento?.direccion || "",
      telefono: user.establesimiento?.telefono || "",
    },
  };

  const formik = useFormik({
    initialValues: initialValues(body),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (establesimientoId) {
        try {
          let body2 = {
            data: {
              nombre: formValue.nombre,
              ruc: formValue.ruc,
              direccion: formValue.direccion,
              telefono: formValue.telefono,
            },
          };

          await ApiEstablesimientoCtrl.update(body2, establesimientoId);
          notify();
        } catch (error) {
          console.error(error);
          notifyError();
        }
      } else {
        try {
          let body2 = {
            data: {
              users: userId,
              nombre: formValue.nombre,
              ruc: formValue.ruc,
              direccion: formValue.direccion,
              telefono: formValue.telefono,
            },
          };

          await ApiEstablesimientoCtrl.postData(body2);
          notify();
          recargar();
        } catch (error) {
          console.error(error);
          notifyError();
        }
      }
    },
  });

  return (
    <ResponsiveDrawer>
      <ToastContainer autoClose={8000} />
      <Container maxWidth="md">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4" gutterBottom>
            Establesimiento
          </Typography>
        </Stack>
        <Typography variant="body1" mb={3} sx={{ color: "red" }}>
          {establesimientoId
            ? null
            : "Es necesario cargar un establesimiento para que el sistema pueda realiar las configuraicones necesarias"}
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
                variant="outlined"
                name="nombre"
                required
                fullWidth
                label="Nombre"
                type="text"
                autoFocus
                value={formik.values.nombre}
                onChange={formik.handleChange}
                error={formik.errors.nombre}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                name="ruc"
                fullWidth
                label="R.U.C."
                type="text"
                value={formik.values.ruc}
                onChange={formik.handleChange}
                error={formik.errors.ruc}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                name="direccion"
                fullWidth
                label="Direccion"
                type="text"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                error={formik.errors.direccion}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                name="telefono"
                fullWidth
                label="Telefono"
                type="text"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                error={formik.errors.telefono}
              />
            </Grid>

            <Grid container>
              <Grid Item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 5, borderRadius: 10 }}
                >
                  {establesimientoId ? "Actualizar" : "Guardar"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ResponsiveDrawer>
  );
};

export default EstablesimientoPage;
