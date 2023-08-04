import { ENV } from "../utils/constantes";

export class ApiNewUser {
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
      return response;
    } catch (error) {
      console.erro(error);
      throw error;
    }
  }
}
