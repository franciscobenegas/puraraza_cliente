import * as React from "react";
import { ResponsiveDrawer } from "../../../components/layouts";
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

import { ApiPesaje } from "../../../api";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useAuth } from "../../../hooks";
import { Loading } from "../../../components/ui/Loading";
import { PesajeAbm } from "../../../components/ui/pesaje/PesajeAbm";
import { DateTime } from "luxon";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const ApiPesajeCtrl = new ApiPesaje();

const SalidaHome = () => {
  const [data, setData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = useState(null);
  const [dato, setDato] = useState(null);
  const [codId, setCodId] = useState(0);
  const [reload, setReload] = useState(false);
  const handleClose = () => setOpen(false);
  const { user } = useAuth();
  const establesimientoId = user.establesimiento.id;
  const accionItem = (id, accion, params) => {
    let datos = {
      data: {
        fecha: params.row.fecha,
        caravana: params.row.caravana,
        clasificacion: params.row.clasificacionId,
        motivo_pesaje: params.row.motivo_pesajeId,
        peso: params.row.peso,
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
  };

  const columns = [
    { field: "id", headerName: "Codigo", width: 80 },
    { field: "fechaFormat", headerName: "Fecha", width: 100 },
    { field: "clasificacion", headerName: "Clasificacion", width: 150 },
    { field: "caravana", headerName: "#Caravana", width: 100 },
    { field: "motivo_pesaje", headerName: "Motivo Pesaje", width: 200 },
    { field: "peso", headerName: "Peso", width: 100 },
    { field: "updatedAt", headerName: "Actualizado", width: 150 },
    { field: "user_upd", headerName: "Usuario", width: 80 },
    {
      field: "actions",
      type: "actions",
      width: 80,
      headerName: "Accion",
      getActions: (params) => [
        <GridActionsCellItem
          sx={{ fontSize: 14 }}
          icon={<ModeEditOutlineOutlinedIcon />}
          label="Modificar"
          showInMenu
          onClick={() => accionItem(params.id, "UPD", params)}
        />,
        <GridActionsCellItem
          sx={{ fontSize: 14, color: "rgb(220, 20, 60)" }}
          icon={<DeleteIcon color="error" />}
          label="Eliminar"
          showInMenu
          onClick={() => accionItem(params.id, "DLT", params)}
        />,
      ],
    },
  ];

  useEffect(() => {
    (async () => {
      const response = await ApiPesajeCtrl.getAll(establesimientoId);
      const result = await response.data;
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
      fecha: rowsr.attributes.fecha,
      clasificacion: rowsr.attributes.clasificacion.data.attributes.nombre,
      clasificacionId: rowsr.attributes.clasificacion.data.id,
      fechaFormat: DateTime.fromISO(rowsr.attributes.fecha).toFormat(
        "dd/MM/yyyy"
      ),
      motivo_pesaje: rowsr.attributes.motivo_pesaje.data.attributes.nombre,
      motivo_pesajeId: rowsr.attributes.motivo_pesaje.data.id,
      caravana: rowsr.attributes.caravana,
      peso: rowsr.attributes.peso,
      updatedAt: DateTime.fromISO(rowsr.attributes.updatedAt).toFormat(
        "dd/MM/yyyy HH':'mm"
      ),
      user_upd: rowsr.attributes.user_upd,
    };
  });

  const onAgregar = () => {
    setOpen(true);
    setMode("ADD");
    setDato("");
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
            Listado Pesaje
          </Typography>
          <Button
            variant="contained"
            startIcon=<AddCircleOutlinedIcon />
            onClick={() => onAgregar()}
          >
            Agregar
          </Button>
        </Stack>
        <Box sx={{ height: 550, width: "100%" }}>
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
            <PesajeAbm
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
