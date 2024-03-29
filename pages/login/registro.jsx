import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import NextLink from "next/link";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import {
  initialValues,
  validationSchema,
} from "../../components/ui/login/registro.form.js";
import { Auth } from "../../api";
import { useRouter } from "next/router.js";
import { useAuth } from "../../hooks";

const authCtrl = new Auth();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Pura Raza S.A.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const PaginaRegistro = () => {
  const { translate } = require("traduction");
  const router = useRouter();
  const { user } = useAuth();
  if (user) {
    router.push("/");
    return null;
  }

  const notify = (error) => {
    toast.error(error + "   👀", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const result = await authCtrl.register(formValue);
        if (result.jwt !== "") {
          router.push("/login/inicio");
        } else {
          const errormsg = await translate(result.error.message, "en", "es");
          notify(errormsg);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer autoClose={8000} />
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          //height: "100vh",
          //backgroundImage: { image },
          //backgroundColor: "red",
          paddingTop: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            paddingRight: "20px",
            paddingLeft: "20px",
            paddingBottom: "5px",
            paddingTop: "1px",
            marginTop: "20px",
          }}
        >
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "darkblue", width: 80, height: 80 }}>
              <PersonPinOutlinedIcon sx={{ fontSize: 60 }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Crear Cuenta
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
                    autoComplete="given-name"
                    name="nombre"
                    required
                    fullWidth
                    id="firstName"
                    label="Nombre"
                    autoFocus
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    error={formik.errors.nombre}
                    helperText={
                      formik.errors.nombre ? "Debe cargar un valor" : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
                    required
                    fullWidth
                    label="Apellido"
                    name="apellido"
                    autoComplete="family-name"
                    value={formik.values.apellido}
                    onChange={formik.handleChange}
                    error={formik.errors.apellido}
                    helperText={
                      formik.errors.nombre ? "Debe cargar un valor" : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    required
                    fullWidth
                    id="email"
                    label="Correo Electronico"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                    helperText={
                      formik.errors.email
                        ? "Debe cargar un correo electronico valido"
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    required
                    fullWidth
                    label="Nombre Usuario"
                    name="username"
                    value={formik.values.username.toLowerCase()}
                    onChange={formik.handleChange}
                    error={formik.errors.username}
                    helperText={
                      formik.errors.nombre ? "Debe cargar un valor" : null
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                    helperText={
                      formik.errors.password
                        ? "Debe cargar una contraseña, minimo 6 caracteres"
                        : "Se requiere minimo de 6 caracteres"
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 10 }}
              >
                Crear Cuenta
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NextLink href="/login/inicio" passHref legacyBehavior>
                    <Link underline="none" variant="body2">
                      ¿Tienes cuenta? Iniciar sesión
                    </Link>
                  </NextLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 3, paddingBottom: 2 }} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default PaginaRegistro;
