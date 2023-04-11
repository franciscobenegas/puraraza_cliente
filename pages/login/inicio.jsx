import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import NextLink from "next/link";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./inicio.form.js";
import { Auth } from "../../api";
import { useRouter } from "next/router.js";
import { toast, ToastContainer } from "react-toastify";
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

const PaginaInicio = () => {
  const { login, user } = useAuth();
  const router = useRouter();
  if (user) {
    router.push("/");
    return null;
  }
  const notify = () => {
    toast.error("Error Inicio de Sesion, verifique Usuario o Contraseña !", {
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
        const response = await authCtrl.login(formValue);
        if (response.jwt) {
          login(response.jwt);
          router.push("/");
        } else {
          notify();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer autoClose={8000} />
      <Container component="main" maxWidth="xs">
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
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "darkblue", width: 80, height: 80 }}>
              <KeyOutlinedIcon sx={{ fontSize: 60 }} />
            </Avatar>

            <Typography component="h1" variant="h5">
              Iniciar Sesion
            </Typography>

            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                //id="email"
                label="Usuario o Contraseña"
                name="identifier"
                autoComplete="email"
                autoFocus
                value={formik.values.identifier}
                onChange={formik.handleChange}
                error={formik.errors.identifier}
              />
              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordar inicio sesion"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 10 }}
              >
                Iniciar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" underline="none">
                    Has olvidado tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <NextLink href="/login/registro" passHref legacyBehavior>
                    <Link underline="none" variant="body2">
                      {"¿No tienes una cuenta?"}
                    </Link>
                  </NextLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5, mb: 4 }} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default PaginaInicio;
