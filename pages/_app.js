//import '@/styles/globals.css'
import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "../context";
import "react-toastify/dist/ReactToastify.css";

import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";

import { SwitchModeButton } from "../components/ui/SwitchModeButton";

import { ColorContext } from "../context";
import { darkTheme } from "../theme/dark";
import { lightTheme } from "../theme/light";

export default function App(props) {
  const { Component, pageProps } = props;
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () => createTheme(mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </ColorContext.Provider>
  );
}
