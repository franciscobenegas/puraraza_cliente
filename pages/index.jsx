import { useEffect, useState } from "react";
import Head from "next/head";
import { ResponsiveDrawer } from "../components/layouts";
import { Grid } from "@mui/material";
import { AppWidgetSummary, AppConversionRates, AppPie } from "../components/ui";
import { useAuth } from "/hooks";
import { useRouter } from "next/router";
import { ApiMortandad } from "../api";

const ApiMortandadCtrl = new ApiMortandad();

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [cantidadTotalMortandad, setCantidadTotalMortandad] = useState(0);
  const establesimientoId = user?.establesimiento?.id;

  if (!establesimientoId) {
    router.push("/configuracion/establesimiento");
  }

  useEffect(() => {
    (async () => {
      if (establesimientoId) {
        const responseMortandad = await ApiMortandadCtrl.getAll(
          establesimientoId
        );
        const result = await responseMortandad.data;
        setCantidadTotalMortandad(result.length);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Pura Raza S.A.</title>
        <meta name="description" content="Sistema Ganadero" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/cow.ico" />
      </Head>
      <main>
        <ResponsiveDrawer>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Mortandad General"
                total={cantidadTotalMortandad}
                icon={"ant-design:android-filled"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Mortandad Ternero"
                total={"0"}
                color="info"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Mortandad Jóvenes"
                total={"0"}
                color="warning"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Mortandad Adultos"
                total={"0"}
                color="error"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <AppConversionRates />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AppPie />
            </Grid>
          </Grid>
        </ResponsiveDrawer>
      </main>
    </>
  );
}
