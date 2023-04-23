import Head from "next/head";
import { ResponsiveDrawer } from "@/components/layouts";
import { Divider, Grid } from "@mui/material";
import { AppWidgetSummary, AppConversionRates, AppPie } from "../components/ui";

export default function Home() {
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
                total={150}
                icon={"ant-design:android-filled"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Mortandad Ternero"
                total={"50"}
                color="info"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Mortandad Jóvenes"
                total={"20"}
                color="warning"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Mortandad Adultos"
                total={"300"}
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
