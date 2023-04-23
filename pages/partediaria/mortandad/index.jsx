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
import { ApiMortandad } from "@/api";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useAuth } from "../../../hooks";
import { Loading } from "@/components/ui/Loading";
import { MortandadAbm } from "@/components/ui/mortandad/MortandadAbm";
import { DateTime } from "luxon";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const ApiMortandadCtrl = new ApiMortandad();

const MortandadHome = () => {
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
        NroCaravana: params.row.nroCaravana,
        NroCaravanaMadre: params.row.nroCaravanaMadre,
        NroCaravanaPadre: params.row.nroCaravanaPadre,
        clasificacion: params.row.clasificacionId,
        clasificacionNombre: params.row.clasificacion,
        causa_mortandad: params.row.causa_mortandadId,
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
    { field: "establesimiento", headerName: "Establesimiento", width: 150 },
    { field: "fechaFormat", headerName: "Fecha", width: 100 },
    { field: "clasificacion", headerName: "Clasificaicon", width: 180 },
    { field: "causa_mortandad", headerName: "Causa Mortandad", width: 180 },
    { field: "nroCaravana", headerName: "#Caravana", width: 100 },
    { field: "nroCaravanaMadre", headerName: "#Madre", width: 100 },
    { field: "nroCaravanaPadre", headerName: "#Padre", width: 100 },
    { field: "updatedAt", headerName: "Actualizado", width: 150 },
    { field: "user_upd", headerName: "Usuario", width: 80 },
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
      const response = await ApiMortandadCtrl.getAll(establesimientoId);
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
      fechaFormat: DateTime.fromISO(rowsr.attributes.fecha).toFormat(
        "dd/MM/yyyy"
      ),
      clasificacion: rowsr.attributes.clasificacion.data.attributes.nombre,
      clasificacionId: rowsr.attributes.clasificacion.data.id,
      causa_mortandad: rowsr.attributes.causa_mortandad.data.attributes.nombre,
      causa_mortandadId: rowsr.attributes.causa_mortandad.data.id,
      nroCaravana: rowsr.attributes.NroCaravana,
      nroCaravanaMadre: rowsr.attributes.NroCaravanaMadre,
      nroCaravanaPadre: rowsr.attributes.NroCaravanaPadre,
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
            Listado Mortandad
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
            <MortandadAbm
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

export default MortandadHome;
