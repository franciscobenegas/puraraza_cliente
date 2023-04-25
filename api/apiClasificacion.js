import { ENV, authFetch } from "@/utils";

export class Clasificacion {
  async getClasificacion(establesimientoId) {
    try {
      const filters = `filters[establesimiento][id][$eq]=${establesimientoId}&populate=*&sort=id`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CLASIFICACION}?${filters}`;
      const response = await authFetch(url);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async postClasificacion(data, establesimientoId, user_upd) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CLASIFICACION}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...data,
            stock: 0,
            establesimiento: establesimientoId,
            user_upd: user_upd,
          },
        }),
      };

      const response = await authFetch(url, params).then((response) =>
        response.json()
      );

      if (response.jwt === "") throw "Error no se pudo dar de alta Usuario.";

      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(data, id) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CLASIFICACION}/${id}`;
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
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CLASIFICACION}/${id}`;
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
