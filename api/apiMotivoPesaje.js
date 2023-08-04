import { ENV, authFetch } from "../utils";

export class ApiMotivoPesaje {
  async getAll(establesimientoId) {
    try {
      const filters = `filters[establesimiento][id][$eq]=${establesimientoId}&populate=*&sort=createdAt:desc`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.MOTIVO_PESAJE}?${filters}`;
      const response = await authFetch(url);
      const result = await response.json();
      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async postData(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.MOTIVO_PESAJE}`;
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
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.MOTIVO_PESAJE}/${id}`;
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

  async delete(id) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.MOTIVO_PESAJE}/${id}`;
      const params = {
        method: "DELETE",
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
