import { ENV } from "../utils/constantes";

export class Auth {
  async register(data) {
    let data2 = {
      ...data,
      rol: "Administrador",
    };

    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data2),
      };

      const response = await fetch(url, params).then((response) =>
        response.json()
      );

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async login(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.LOGIN}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params).then((response) =>
        response.json()
      );

      if (response.jwt === "") throw "No se pudo Iniciar Sesion.";

      return response;
    } catch (error) {
      throw error;
      console.error(error);
    }
  }
}
