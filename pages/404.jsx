import React from "react";
import { Box, Typography } from "@mui/material";
import { ResponsiveDrawer } from "../components/layouts";

const Custom404 = () => {
  return (
    <ResponsiveDrawer>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Typography variant="h1" component="h1" fontSize={60} fontWeight={100}>
          404 |
        </Typography>
        <Typography marginLeft={2}>
          No encontramos ninguna página aquí
        </Typography>
      </Box>
    </ResponsiveDrawer>
  );
};

export default Custom404;
