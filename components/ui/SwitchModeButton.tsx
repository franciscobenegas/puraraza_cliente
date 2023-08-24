import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import DarkIcon from "@mui/icons-material/Brightness4";
import LightIcon from "@mui/icons-material/Brightness7";
import { ColorContext } from "../../context";

export const SwitchModeButton = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorContext);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? <DarkIcon /> : <LightIcon />}
      </IconButton>
    </Box>
  );
};
