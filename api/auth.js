import { ENV } from "../utils/constantes";

export class Auth {
  async register(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER}`;
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

      if (response.jwt === "") throw "Error no se pudo dar de alta Usuario.";

      return response;
    } catch (error) {
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

      //if (response.jwt === "") throw "No se pudo Iniciar Sesion.";
      //console.log(response.error.message);
      return response;
    } catch (error) {
      throw error;
    }
  }
}