//import '@/styles/globals.css'
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "../context";
import "react-toastify/dist/ReactToastify.css";

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <AuthProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
