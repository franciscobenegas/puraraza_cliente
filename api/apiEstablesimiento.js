import { ENV, authFetch } from "../utils";

export class ApiEstablesimiento {
  async getAll(establesimientoId) {
    try {
      const filters = `filters[establesimiento][id][$eq]=${establesimientoId}&populate=*&sort=id`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ESTABLESIMIENTO}?${filters}`;
      const response = await authFetch(url);
      const result = await response.json();
      console.log(result);
      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async postData(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ESTABLESIMIENTO}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await authFetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw response;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(data, id) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ESTABLESIMIENTO}/${id}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await authFetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw response;
      return result;
    } catch (error) {
      throw error;
    }
  }
}
