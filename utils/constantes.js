export const ENV = {
  // Base de Datos Local
  //SERVER_HOST: "http://localhost:1337",
  //API_URL: "http://localhost:1337/api",

  // Base de Datos Nube
  SERVER_HOST: "https://strapi-production-49f2.up.railway.app",
  API_URL: "https://strapi-production-49f2.up.railway.app/api",

  ENDPOINTS: {
    AUTH: {
      REGISTER: "auth/local/register",
      LOGIN: "auth/local",
    },
    USERS_ME: "users/me",
    USERS: "users",
    CAUSA_MORTANDAD: "causa-mortandads",
    CLASIFICACION: "clasificacions",
    TIPO_RAZA: "tipo-razas",
    MOTIVO_PESAJE: "motivo-pesajes",
    MOTIVO_ENTRADA: "motivo-entradas",
    MOTIVO_SALIDA: "motivo-salidas",
    MORTANDAD: "mortandads",
    NACIMIENTO: "nacimientos",
    ESTABLESIMIENTO: "establesimientos",
    ENTRADA: "entradas",
    SALIDA: "salidas",
    MOVIMIENTOS: "movimientos",
    PESAJE: "pesajes",
    USUARIO: "users",
  },
  TOKEN: "Token_PuraRazapp",
  CART: "cart",
  STRIPE_TOKEN:
    "0a683301cb01f2428652336b815d422887e88a9a4d24933bd992fa3cf2e332486fbd2010b9a698da0b22c8f009d3955586495f0112d0827c246b7f43f9f06e2f44fa9ded6d27d01852ab324dbda22b28cf20abb153c5c7b5e0312cb87130abd7d9412d3ac0b8c0e3676e96a6d41a8966640b88886afd9e9f09da29fd2001aff4",
};
