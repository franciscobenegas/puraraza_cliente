import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";
import { Box, Paper } from "@mui/material";
import { Clasificacion } from "../../api";
import { useAuth } from "../../hooks";

const clasificacionCtrl = new Clasificacion();

ChartJS.register(ArcElement, Tooltip, Legend);

export const AppPie = () => {
  const { user } = useAuth();
  const [clasificacion, setClasificacion] = useState([]);
  const establesimientoId = user.establesimiento?.id;

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
        //label: "# of Votes",
        data: dato,
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Paper elevation={3}>
      <Box
        sx={{
          width: 350,
          height: 350,
          mt: 2,
          ml: 3,
          //mb: 3,
          paddingBottom: 1,
          //alignContent: "center",
        }}
      >
        <Doughnut data={data} />
      </Box>
    </Paper>
  );
};
