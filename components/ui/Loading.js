import React from "react";
import { ResponsiveDrawer } from "../layouts";
import { Box, Typography, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <ResponsiveDrawer>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
      >
        <Typography sx={{ mb: 3 }} variant="h6" fontWeight={200} fontSize={20}>
          Cargando...
        </Typography>
        <CircularProgress thickness={2} />
      </Box>
    </ResponsiveDrawer>
  );
};
