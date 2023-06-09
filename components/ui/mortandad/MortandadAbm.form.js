import * as Yup from "yup";

export function initialValues(dato) {
  const { data } = dato;
  const fecha = new Date().toISOString().slice(0, 10);
  return {
    fecha: data?.fecha || fecha,
    NroCaravana: data?.NroCaravana || "",
    NroCaravanaMadre: data?.NroCaravanaMadre || "",
    NroCaravanaPadre: data?.NroCaravanaPadre || "",
    clasificacion: data?.clasificacion || "",
    causa_mortandad: data?.causa_mortandad || "",
    stock: data?.stock || "",
  };
}

export function validationSchema() {
  return Yup.object({
    fecha: Yup.date().required(true),
    clasificacion: Yup.string().required(true),
    causa_mortandad: Yup.string().required(true),
  });
}
