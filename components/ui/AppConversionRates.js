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
//import faker from "faker";

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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Cantidad por Clasificacion",
      data: [100, 200, 300, 700, 500, 600, 200],
      backgroundColor: "skyblue",
    },
  ],
};

export const AppConversionRates = () => {
  const { user } = useAuth();
  //const establesimientoId = user.establesimiento.id;

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
