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
import { ApiMotivoPesaje } from "@/api";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks";
import { Loading } from "@/components/ui/Loading";
import { MotivoPesajeAbm } from "@/components/ui/motivoPesaje/MotivoPesajeAbm";
import { DateTime } from "luxon";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const ApiMotivoPesajeCtrl = new ApiMotivoPesaje();

const MotivoPesajePage = () => {
  const [data, setData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = useState(null);
  const [codId, setCodId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [reload, setReload] = useState(false);
  const handleClose = () => setOpen(false);

  const router = useRouter();
  const { user } = useAuth();
  const establesimientoId = user.establesimiento.id;
  const accionItem = (id, accion, params) => {
    switch (accion) {
      case "DLT":
        setOpen(true);
        setMode("DLT");
        setCodId(id);
        setNombre(params.row.nombre);
        break;
      case "UPD":
        setOpen(true);
        setMode("UPD");
        setCodId(id);
        setNombre(params.row.nombre);
        break;
    }
  };

  const columns = [
    { field: "id", headerName: "Codigo", width: 100 },
    { field: "establesimiento", headerName: "Establesimiento", width: 200 },
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "updatedAt", headerName: "Actualizado", width: 150 },
    { field: "user_upd", headerName: "Usuario", width: 150 },
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
          onClick={() => accionItem(params.id, "UPD", params)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label=<Typography color="error">Eliminar</Typography>
          showInMenu
          onClick={() => accionItem(params.id, "DLT", params)}
        />,
      ],
    },
  ];

  useEffect(() => {
    (async () => {
      const response = await ApiMotivoPesajeCtrl.getAll(establesimientoId);
      const result = await response.data;
      console.log(result);
      setData(result);
      setReload(false);
    })();
  }, [reload]);

  if (!data) {
    return <Loading />;
  }

  const row = map(data, (rowsr) => {
    return {
      id: rowsr.id,
      establesimiento: rowsr.attributes.establesimiento.data.attributes.nombre,
      nombre: rowsr.attributes.nombre,
      updatedAt: DateTime.fromISO(rowsr.attributes.updatedAt).toFormat(
        "dd/MM/yyyy HH':'mm"
      ),
      user_upd: rowsr.attributes.user_upd,
    };
  });

  const onAgregar = () => {
    setOpen(true);
    setMode("ADD");
    setNombre("");
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
            Listado Motivo Pesaje
          </Typography>
          <Button
            variant="contained"
            startIcon=<AddCircleOutlinedIcon />
            onClick={() => onAgregar()}
          >
            Agregar
          </Button>
        </Stack>
        <Box sx={{ height: 500, width: "85%" }}>
          <DataGrid
            rows={row}
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
            <MotivoPesajeAbm
              setOpen={setOpen}
              mode={mode}
              codId={codId}
              nombre={nombre}
              setReload={setReload}
            />
          </Box>
        </Modal>
      </Container>
    </ResponsiveDrawer>
  );
};

export default MotivoPesajePage;
