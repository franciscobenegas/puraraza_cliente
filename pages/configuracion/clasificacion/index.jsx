import * as React from "react";
import { ResponsiveDrawer } from "@/components/layouts";
import { map } from "lodash";
import { useEffect, useState } from "react";
import {
  Stack,
  Container,
  Typography,
  Button,
  Box,
  Modal,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Clasificacion } from "@/api";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks";
import { Loading } from "@/components/ui/Loading";
import { UpdateDelete } from "@/components/ui/clasificacion/UpdateDelete";
import { DateTime } from "luxon";
import { fNumber } from "../../../utils/formatNumber";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const clasificacionCtrl = new Clasificacion();

const ClasificacionPage = () => {
  const [data, setData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = useState(null);
  const [codId, setCodId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [reload, setReload] = useState(false);
  const [dosAnhos, setDosAnhos] = useState("");
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const { user } = useAuth();

  const establesimientoId = user?.establesimiento.id;

  const accionItem = (id, accion, params) => {
    switch (accion) {
      case "Modificar":
        setOpen(true);
        setMode("UPD");
        setCodId(id);
        setNombre(params.row.nombre);
        setPrecio(params.row.precio);
        setDosAnhos(params.row.dosAnhos);
        break;
      case "Eliminar":
        setOpen(true);
        setMode("DLT");
        setCodId(id);
        setNombre(params.row.nombre);
        setPrecio(params.row.precio);
        setDosAnhos(params.row.dosAnhos);
        break;
      default:
        break;
    }
  };

  const columns = [
    { field: "id", headerName: "Codigo", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "dosAnhos", headerName: "Dos Años", width: 150 },
    { field: "stock", headerName: "Cantidad", width: 100 },
    { field: "precio", headerName: "Costo Uni.", width: 100 },
    { field: "inversion", headerName: "Inversion", width: 150 },
    {
      field: "updatedAt",
      headerName: "Actualizado",
      width: 150,
    },
    { field: "user_upd", headerName: "Usuario", width: 100 },
    {
      field: "actions",
      type: "actions",
      width: 80,
      headerName: "Accion",

      getActions: (params) => [
        <GridActionsCellItem
          icon={<ModeEditOutlineOutlinedIcon />}
          label="Modificar"
          showInMenu
          onClick={() => accionItem(params.id, "Modificar", params)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label=<Typography color="error">Eliminar</Typography>
          showInMenu
          onClick={() => accionItem(params.id, "Eliminar", params)}
        />,
      ],
    },
  ];

  useEffect(() => {
    (async () => {
      const response = await clasificacionCtrl.getClasificacion(
        establesimientoId
      );
      const result = await response.data;
      setData(result);
      setReload(false);
    })();
  }, [reload]);

  if (!data) {
    return <Loading />;
  }

  const rows2 = map(data, (row) => {
    return {
      id: row.id,
      nombre: row.attributes.nombre,
      dosAnhos: row.attributes.dosAnhos,
      stock: fNumber(row.attributes.stock),
      precio: fNumber(row.attributes.precio),
      inversion: fNumber(row.attributes.stock * row.attributes.precio),
      updatedAt: DateTime.fromISO(row.attributes.updatedAt).toFormat(
        "dd/MM/yyyy HH':'mm"
      ),
      user_upd: row.attributes.user_upd,
    };
  });

  const AddClasificacion = () => {
    router.push("/configuracion/clasificacion/add");
  };

  return (
    <ResponsiveDrawer>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h4" gutterBottom>
            Listado Calsificaciones
          </Typography>
          <Button
            variant="contained"
            startIcon=<AddCircleOutlinedIcon />
            onClick={() => AddClasificacion()}
          >
            Agregar
          </Button>
        </Stack>
        <Box sx={{ height: 550, width: "100%" }}>
          <DataGrid
            rows={rows2}
            columns={columns}
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
          />
        </Box>

        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <UpdateDelete
              setOpen={setOpen}
              mode={mode}
              codId={codId}
              nombre={nombre}
              precio={precio}
              setReload={setReload}
              dosAnhos={dosAnhos}
            />
          </Box>
        </Modal>
      </Container>
    </ResponsiveDrawer>
  );
};

export default ClasificacionPage;
