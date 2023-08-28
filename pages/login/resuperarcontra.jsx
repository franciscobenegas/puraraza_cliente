import { useState, useRef } from "react";
import {
  Avatar,
  IconButton,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  InputAdornment,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NextLink from "next/link";
import { useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "../../components/ui/login/recupera.form.js";

import { Auth } from "../../api/index.js";
import { useRouter } from "next/router.js";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../hooks/index.js";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { blue } from "@mui/material/colors";
import emailjs from "@emailjs/browser";

const authCtrl = new Auth();
const USER_ID = "qdRRvKTKMmdNp-xiY"; //process.env.REACT_APP_EMAILJS_USERID;
const TEMPLATE_ID = "template_omvh686"; //process.env.REACT_APP_EMAILJS_TEMPLATEID;
const SERVICE_ID = "service_w7kwd3h"; //process.env.REACT_APP_EMAILJS_SERVICEID;

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

const PaginaRecuperaContrasena = () => {
  const [correo, setCorreo] = useState("");

  const notify = () => {
    toast.info("Se ha enviado una Correo para reestablecer su contraseña !", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  };

  const notifyErr = () => {
    toast.error(
      "Algo salio mal, no se pudo enviar el correo, consulte con el Administrador!",
      {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      }
    );
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const url = "http://localhost:3000/api/api_four";
        const params = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValue),
        };

        const response = await fetch(url, params);
        if (response.status !== 200) {
          notifyErr();
        }
        if (response.status === 200) {
          notify();
        }
      } catch (error) {
        throw error;
        notifyErr();
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
              Recuperar Contraseña
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
                label="Correo Electronico"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 10 }}
              >
                Recuperar Cotraseña
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NextLink href="/login/inicio" passHref legacyBehavior>
                    <Link underline="none" variant="body2">
                      Volver al Inicio
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

export default PaginaRecuperaContrasena;
