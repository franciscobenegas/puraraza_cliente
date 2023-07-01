import * as React from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowRight from "@mui/icons-material/ArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import MonitorWeightOutlinedIcon from "@mui/icons-material/MonitorWeightOutlined";
import { useRouter } from "next/router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "@/hooks";

const data = [
  {
    icon: <BlockOutlinedIcon />,
    label: "Mortandad",
    path: "/partediaria/mortandad",
  },
  {
    icon: <AddCircleOutlineOutlinedIcon />,
    label: "Nacimiento",
    path: "/partediaria/nacimiento",
  },
  {
    icon: <ArrowBackOutlinedIcon />,
    label: "Entrada",
    path: "/partediaria/entrada",
  },
  {
    icon: <ArrowForwardOutlinedIcon />,
    label: "Salida",
    path: "/partediaria/salida",
  },
  {
    icon: <MonitorWeightOutlinedIcon />,
    label: "Pesaje",
    path: "/partediaria/pesaje",
  },
];

const data2 = [
  {
    icon: <AddHomeWorkOutlinedIcon />,
    label: "Clasificacion",
    path: "/configuracion/clasificacion",
  },
  {
    icon: <FactCheckOutlinedIcon />,
    label: "Tipo Razas",
    path: "/configuracion/tiporaza",
  },
  {
    icon: <BlockOutlinedIcon />,
    label: "Causa Mortandad",
    path: "/configuracion/causamortandad",
  },
  {
    icon: <MonitorWeightOutlinedIcon />,
    label: "Motivo Pesaje",
    path: "/configuracion/motivopesaje",
  },
  {
    icon: <ArrowBackOutlinedIcon />,
    label: "Motivo Entrada",
    path: "/configuracion/motivoentrada",
  },
  {
    icon: <ArrowForwardOutlinedIcon />,
    label: "Motivo Salida",
    path: "/configuracion/motivosalida",
  },
  {
    icon: <AddHomeOutlinedIcon />,
    label: "Establesimiento",
    path: "/configuracion/establesimiento",
  },
  {
    icon: <PersonAddOutlinedIcon />,
    label: "Usuarios",
    path: "/configuracion/usuarios",
  },
];

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const notifyError = () => {
  toast.error("Debe cargar los datos de Establesimiento", {
    position: toast.POSITION.TOP_RIGHT,
    theme: "colored",
  });
};

export const ItemMenu = () => {
  const { user } = useAuth();
  const establesimientoId = user?.establesimiento?.id;
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const router = useRouter();
  const rutaActual = router.asPath;
  console.log(rutaActual);
  const irMenu = (menu) => {
    console.log("menu = " + menu);
    if (!establesimientoId) {
      notifyError();
      return;
    }
    switch (menu) {
      case "Salida":
        router.push("/partediaria/salida");
        break;
      case "Entrada":
        router.push("/partediaria/entrada");
        break;
      case "Establesimiento":
        router.push("/configuracion/establesimiento");
        break;
      case "Mortandad":
        router.push("/partediaria/mortandad");
        break;
      case "Nacimiento":
        router.push("/partediaria/nacimiento");
        break;
      case "Motivo Entrada":
        router.push("/configuracion/motivoentrada");
        break;
      case "Motivo Salida":
        router.push("/configuracion/motivosalida");
        break;
      case "Motivo Pesaje":
        router.push("/configuracion/motivopesaje");
        break;
      case "Tipo Razas":
        router.push("/configuracion/tiporaza");
        break;
      case "Clasificacion":
        router.push("/configuracion/clasificacion");
        break;
      case "Causa Mortandad":
        router.push("/configuracion/causamortandad");
        break;
      case "INICIO":
        router.push("/");
        break;
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <ToastContainer autoClose={8000} />
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            primary: { main: "rgb(102, 157, 246)" },
            background: { paper: "rgb(5, 30, 52)" },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 256 }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" href="/">
              <ListItemIcon sx={{ fontSize: 25 }}></ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="Pura Raza S.A."
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: "medium",
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }}>
                <ListItemIcon>
                  <Home color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Inicio"
                  primaryTypographyProps={{
                    color: "primary",
                    fontWeight: "medium",
                    variant: "body2",
                  }}
                  onClick={() => irMenu("INICIO")}
                />
              </ListItemButton>
              <Tooltip title="Configuraciones">
                <IconButton
                  size="large"
                  sx={{
                    "& svg": {
                      color: "rgba(255,255,255,0.8)",
                      transition: "0.2s",
                      transform: "translateX(0) rotate(0)",
                    },
                    "&:hover, &:focus": {
                      bgcolor: "unset",
                      "& svg:first-of-type": {
                        transform: "translateX(-4px) rotate(-20deg)",
                      },
                      "& svg:last-of-type": {
                        right: 0,
                        opacity: 1,
                      },
                    },
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      height: "80%",
                      display: "block",
                      left: 0,
                      width: "1px",
                      bgcolor: "divider",
                    },
                  }}
                >
                  <Settings />
                  <ArrowRight
                    sx={{ position: "absolute", right: 4, opacity: 0 }}
                  />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider />

            <TransitionGroup>
              <Box
                sx={{
                  bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
                  pb: open ? 2 : 0,
                }}
              >
                <ListItemButton
                  alignItems="flex-start"
                  onClick={() => setOpen(!open)}
                  sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open ? 0 : 2.5,
                    "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
                  }}
                >
                  <ListItemText
                    primary="Parte Diaria"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                    secondary="Mortandad, Nacimiento, Entrada, Salida, Pesaje"
                    secondaryTypographyProps={{
                      noWrap: true,
                      fontSize: 12,
                      lineHeight: "16px",
                      color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                    }}
                    sx={{ my: 0 }}
                  />
                  <KeyboardArrowDown
                    sx={{
                      mr: -1,
                      opacity: 0,
                      transform: open ? "rotate(-180deg)" : "rotate(0)",
                      transition: "0.2s",
                    }}
                  />
                </ListItemButton>

                {open &&
                  data.map((item) => (
                    <ListItemButton
                      key={item.label}
                      sx={{
                        py: 0,
                        minHeight: 32,
                        color:
                          rutaActual === item.path
                            ? "#1976D2"
                            : "rgba(255,255,255,.8)",
                      }}
                    >
                      <ListItemIcon sx={{ color: "inherit" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: "medium",
                        }}
                        onClick={() => irMenu(item.label)}
                      />
                    </ListItemButton>
                  ))}

                <ListItemButton
                  alignItems="flex-start"
                  onClick={() => setOpen2(!open2)}
                  sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open2 ? 0 : 2.5,
                    "&:hover, &:focus": { "& svg": { opacity: open2 ? 1 : 0 } },
                  }}
                >
                  <ListItemText
                    primary="Configuracion"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                    secondary="Clasificacion, Establesimiento, Causa Mortandad, Motivo Entrada, Motivo Salida, Motivo Pesaje"
                    secondaryTypographyProps={{
                      noWrap: true,
                      fontSize: 12,
                      lineHeight: "16px",
                      color: open2 ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                    }}
                    sx={{ my: 0 }}
                  />
                  <KeyboardArrowDown
                    sx={{
                      mr: -1,
                      opacity: 0,
                      transform: open2 ? "rotate(-180deg)" : "rotate(0)",
                      transition: "0.2s",
                    }}
                  />
                </ListItemButton>

                {open2 &&
                  data2.map((item) => (
                    <ListItemButton
                      key={item.label}
                      sx={{
                        py: 0,
                        minHeight: 32,
                        color:
                          rutaActual === item.path
                            ? "#1976D2"
                            : "rgba(255,255,255,.8)",
                      }}
                    >
                      <ListItemIcon sx={{ color: "inherit" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: "medium",
                        }}
                        onClick={() => irMenu(item.label)}
                      />
                    </ListItemButton>
                  ))}
              </Box>
            </TransitionGroup>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
};
