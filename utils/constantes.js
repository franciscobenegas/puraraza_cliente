export const ENV = {
  // Base de Datos Local
  SERVER_HOST: "http://localhost:1337",
  API_URL: "http://localhost:1337/api",

  // Base de Datos Nube
  //SERVER_HOST: "https://strapi-production-3882.up.railway.app",
  //API_URL: "https://strapi-production-3882.up.railway.app/api",

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
    "pk_test_51McFNvGuOrnPfQra2CPEv40T6bwjvke3EmtZELp3685TKzCMDgagCauuO8nOVgL2sI4eiU0s830K3aZj31iOXtoV00zA9gPqMd",
};
