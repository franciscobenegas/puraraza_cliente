import { useEffect, useState } from "react";
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
import {
  ApiEstablesimiento,
  ApiCausaMort,
  ApiMotivoEntrada,
  ApiMotivoSalida,
  ApiTipoRaza,
} from "@/api";
import { Clasificacion } from "@/api";
import { toast, ToastContainer } from "react-toastify";
import confetti from "canvas-confetti";
import { useRouter } from "next/router.js";

const ApiEstablesimientoCtrl = new ApiEstablesimiento();
const clasificacionCtrl = new Clasificacion();
const causaMortandadCtrl = new ApiCausaMort();
const motivoEntradaCtrl = new ApiMotivoEntrada();
const motivoSalidaCtrl = new ApiMotivoSalida();
const tipoRazaCtrl = new ApiTipoRaza();

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
  window.setTimeout(window.location.reload(true), 5000);
};

const EstablesimientoPage = () => {
  const { user } = useAuth();
  const establesimientoId = user?.establesimiento?.id;
  const userId = user?.id;
  const userNombre = user?.username;
  const router = useRouter();

  let body = {
    data: {
      nombre: user?.establesimiento?.nombre || "",
      ruc: user?.establesimiento?.ruc || "",
      direccion: user?.establesimiento?.direccion || "",
      telefono: user?.establesimiento?.telefono || "",
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
          confetti();
          router.push("/");
          recargar();
        } catch (error) {
          console.error(error);
          notifyError();
        }
      }
    },
  });

  useEffect(() => {
    (async () => {
      // TODO: Si no existe Clasificacion lo carga por defecto.
      if (establesimientoId) {
        const responseClasificacion = await clasificacionCtrl.getClasificacion(
          establesimientoId
        );

        if (responseClasificacion.data.length === 0) {
          await clasificacionCtrl.postNewAll(
            "Vaca",
            "Mayor",
            establesimientoId,
            userNombre
          );
          await clasificacionCtrl.postNewAll(
            "Toro",
            "Mayor",
            establesimientoId,
            userNombre
          );
          await clasificacionCtrl.postNewAll(
            "Vaquilla",
            "Mayor",
            establesimientoId,
            userNombre
          );
          await clasificacionCtrl.postNewAll(
            "Novillo",
            "Mayor",
            establesimientoId,
            userNombre
          );
          await clasificacionCtrl.postNewAll(
            "Desmamante Macho",
            "Menor",
            establesimientoId,
            userNombre
          );
          await clasificacionCtrl.postNewAll(
            "Desmamante Hembra",
            "Menor",
            establesimientoId,
            userNombre
          );
          await clasificacionCtrl.postNewAll(
            "Ternero Macho",
            "Recien Nacido",
            establesimientoId,
            userNombre
          );
          await clasificacionCtrl.postNewAll(
            "Ternero Hembra",
            "Recien Nacido",
            establesimientoId,
            userNombre
          );
          await clasificacionCtrl.postNewAll(
            "Buey",
            "Mayor",
            establesimientoId,
            userNombre
          );
        }

        // TODO: Si no existe Causa de Mortandad lo carga por defecto.
        const responseCausaMortandad = await causaMortandadCtrl.getCausaMort(
          establesimientoId
        );

        if (responseCausaMortandad.data.length === 0) {
          let body = {
            data: {
              nombre: "Desconosido",
              establesimiento: establesimientoId,
              user_upd: userNombre,
            },
          };
          await causaMortandadCtrl.postCausaMortandad(body);

          let body1 = {
            data: {
              nombre: "Enfermedad",
              establesimiento: establesimientoId,
              user_upd: userNombre,
            },
          };
          await causaMortandadCtrl.postCausaMortandad(body1);

          let body2 = {
            data: {
              nombre: "Picadura de Vibora",
              establesimiento: establesimientoId,
              user_upd: userNombre,
            },
          };
          await causaMortandadCtrl.postCausaMortandad(body2);
        }

        // TODO: Si no existe Motivo de Entrada lo carga por defecto.
        const responseMotivoEntrada = await motivoEntradaCtrl.getAll(
          establesimientoId
        );

        if (responseMotivoEntrada.data.length === 0) {
          let bodyME = {
            data: {
              nombre: "Ninguno",
              establesimiento: establesimientoId,
              user_upd: userNombre,
            },
          };
          await motivoEntradaCtrl.postData(bodyME);

          let bodyME1 = {
            data: {
              nombre: "Compra",
              establesimiento: establesimientoId,
              user_upd: userNombre,
            },
          };
          await motivoEntradaCtrl.postData(bodyME1);
        }

        // TODO: Si no existe Motivo de Salida lo carga por defecto.
        const responseMotivoSalida = await motivoSalidaCtrl.getAll(
          establesimientoId
        );

        if (responseMotivoSalida.data.length === 0) {
          let bodyMS = {
            data: {
              nombre: "Ninguno",
              establesimiento: establesimientoId,
              user_upd: userNombre,
            },
          };
          await motivoSalidaCtrl.postData(bodyMS);

          let bodyMS1 = {
            data: {
              nombre: "Venta",
              establesimiento: establesimientoId,
              user_upd: userNombre,
            },
          };
          await motivoSalidaCtrl.postData(bodyMS1);
        }

        // TODO: Si no existe Tipo de Raza lo carga por defecto.
        const responseTipoRaza = await tipoRazaCtrl.getAll(establesimientoId);
        if (responseTipoRaza.data.length === 0) {
          let bodyTR = {
            data: {
              nombre: "Ninguno",
              establesimiento: establesimientoId,
              user_upd: userNombre,
            },
          };
          await tipoRazaCtrl.postData(bodyTR);

          let bodyTR1 = {
            data: {
              nombre: "Brahman",
              establesimiento: establesimientoId,
              user_upd: userNombre,
            },
          };
          await tipoRazaCtrl.postData(bodyTR1);

          let bodyTR2 = {
            data: {
              nombre: "Beefmaster",
              establesimiento: establesimientoId,
              user_upd: userNombre,
            },
          };
          await tipoRazaCtrl.postData(bodyTR2);

          let bodyTR3 = {
            data: {
              nombre: "Charolais",
              establesimiento: establesimientoId,
              user_upd: userNombre,
            },
          };
          await tipoRazaCtrl.postData(bodyTR3);

          let bodyTR4 = {
            data: {
              nombre: "Simmental",
              establesimiento: establesimientoId,
              user_upd: userNombre,
            },
          };
          await tipoRazaCtrl.postData(bodyTR4);

          let bodyTR5 = {
            data: {
              nombre: "Angus",
              establesimiento: establesimientoId,
              user_upd: userNombre,
            },
          };
          await tipoRazaCtrl.postData(bodyTR5);

          let bodyTR6 = {
            data: {
              nombre: "Brangus",
              establesimiento: establesimientoId,
              user_upd: userNombre,
            },
          };
          await tipoRazaCtrl.postData(bodyTR6);

          let bodyTR7 = {
            data: {
              nombre: "Nelore",
              establesimiento: establesimientoId,
              user_upd: userNombre,
            },
          };
          await tipoRazaCtrl.postData(bodyTR7);

          let bodyTR8 = {
            data: {
              nombre: "Santa Gertrudis",
              establesimiento: establesimientoId,
              user_upd: userNombre,
            },
          };
          await tipoRazaCtrl.postData(bodyTR8);

          let bodyTR9 = {
            data: {
              nombre: "Hereford",
              establesimiento: establesimientoId,
              user_upd: userNombre,
            },
          };
          await tipoRazaCtrl.postData(bodyTR9);
        }
      }
    })();
  }, []);

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
