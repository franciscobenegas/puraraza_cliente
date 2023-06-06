import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box, Paper } from "@mui/material";
import { Clasificacion } from "@/api";
import { useAuth } from "@/hooks";

const clasificacionCtrl = new Clasificacion();

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      //text: "Grafico Clasificacion",
    },
  },
};

export const AppConversionRates = () => {
  const { user } = useAuth();
  const [clasificacion, setClasificacion] = useState([]);
  const establesimientoId = user.establesimiento.id;

  useEffect(() => {
    (async () => {
      const response = await clasificacionCtrl.getClasificacion(
        establesimientoId
      );
      const result = await response.data;
      setClasificacion(result);
    })();
  }, []);

  const dato = clasificacion.map((dat) => {
    return dat.attributes.stock;
  });

  const labels = clasificacion.map((dat) => {
    return dat.attributes.nombre;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Cantidad",
        data: dato,
        backgroundColor: "skyblue",
      },
    ],
  };

  return (
    <Paper elevation={3}>
      <Box
        sx={{
          width: 700,
          height: 350,
          paddingLeft: 2,
          mt: 2,
        }}
      >
        <Bar options={options} data={data} />
      </Box>
    </Paper>
  );
};
