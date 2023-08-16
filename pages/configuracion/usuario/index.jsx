import * as React from "react";
import { ResponsiveDrawer } from "../../../components/layouts";
import { map } from "lodash";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  Stack,
  Container,
  Typography,
  Button,
  Box,
  Modal,
  Chip,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { ApiUsuario } from "../../../api";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DoDisturbOffOutlinedIcon from "@mui/icons-material/DoDisturbOffOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import { useAuth } from "../../../hooks";
import { Loading } from "../../../components/ui/Loading";
import { UsuarioAbm } from "../../../components/ui/usuarios/UsuarioAbm";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const ApiUsuarioCtrl = new ApiUsuario();

const SalidaHome = () => {
  const [data, setData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = useState(null);
  const [dato, setDato] = useState(null);
  const [codId, setCodId] = useState(0);
  const [reload, setReload] = useState(false);
  const handleClose = () => setOpen(false);
  const { user } = useAuth();
  const establesimientoId = user?.establesimiento.id;
  const accionItem = (id, accion, params) => {
    const notify = () => {
      toast.error(
        "Solo el usuario Administrador puede cambiar parametros de Usuario",
        {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        }
      );
    };

    if (user.rol === "Administrador") {
      let datos = {
        data: {
          nombre: params.row.nombre,
          apellido: params.row.apellido,
          email: params.row.email,
          username: params.row.username,
          rol: params.row.rol,
        },
      };
      setCodId(id);
      switch (accion) {
        case "DLT":
          setOpen(true);
          setMode("DLT");
          setDato(datos);
          break;
        case "UPD":
          setOpen(true);
          setMode("UPD");
          setDato(datos);

          break;
      }
    } else {
      notify();
    }
  };

  const columns = [
    { field: "id", headerName: "Codigo", width: 80 },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 150,
    },
    { field: "apellido", headerName: "Apellido", width: 150 },
    { field: "email", headerName: "Correo Electronico", width: 220 },
    { field: "username", headerName: "Usuario", width: 80 },
    { field: "rol", headerName: "Roles", width: 120 },
    { field: "blocked", headerName: "Habilitado", width: 100 },
    {
      field: "actions",
      type: "actions",
      width: 80,
      headerName: "Accion",
      getActions: (params) => [
        <GridActionsCellItem
          sx={{ fontSize: 14, color: "#1976D2" }}
          icon={<KeyOutlinedIcon color="primary" />}
          label="Cambiar Contraseña"
          showInMenu
          onClick={() => accionItem(params.id, "UPD", params)}
        />,
        <GridActionsCellItem
          sx={{ fontSize: 14, color: "rgb(220, 20, 60)" }}
          icon={<DoDisturbOffOutlinedIcon color="error" />}
          label="Deshabilitar"
          showInMenu
          onClick={() => accionItem(params.id, "DLT", params)}
        />,
      ],
    },
  ];

  useEffect(() => {
    (async () => {
      const response = await ApiUsuarioCtrl.getAll(establesimientoId);
      setData(response);
      setReload(false);
    })();
  }, [reload]);

  if (!data) {
    return <Loading />;
  }

  const row = map(data, (rowsr) => {
    return {
      id: rowsr.id,
      establesimiento: rowsr.establesimiento.nombre,
      nombre: rowsr.nombre,
      apellido: rowsr.apellido,
      email: rowsr.email,
      username: rowsr.username,
      rol: rowsr.rol,
      blocked: rowsr.blocked ? "NO" : "SI",
    };
  });

  const onAgregar = () => {
    setOpen(true);
    setMode("ADD");
    setDato("");
  };

  return (
    <ResponsiveDrawer>
      <ToastContainer autoClose={8000} />
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h4" gutterBottom>
            Listado Usuarios
          </Typography>
          <Button
            variant="contained"
            startIcon=<AddCircleOutlinedIcon />
            onClick={() => onAgregar()}
          >
            Agregar
          </Button>
        </Stack>
        <Box
          sx={{
            height: 550,
            width: "100%",
            "& .cold": {
              //borderColor: "ActiveBorder",
              borderRadius: 25,
              backgroundColor: "#b9d5ff91",
              color: "#1a3e72",
              maxHeight: 15,
              paddingLeft: 5,
            },
            "& .hot": {
              //borderColor: "ActiveBorder",
              borderRadius: 25,
              paddingLeft: 5,
              backgroundColor: "#ff943975",
              color: "#1a3e72",
            },
          }}
        >
          <DataGrid
            rows={row}
            columns={columns}
            getCellClassName={(params) => {
              if (params.field === "blocked") {
                return params.value === "SI" ? "cold" : "hot";
              }
            }}
            pageSize={10}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            slots={{
              toolbar: CustomToolbar,
            }}
            sx={{
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
          />
        </Box>

        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <UsuarioAbm
              setOpen={setOpen}
              mode={mode}
              dato={dato}
              codId={codId}
              setReload={setReload}
            />
          </Box>
        </Modal>
      </Container>
    </ResponsiveDrawer>
  );
};

export default SalidaHome;
