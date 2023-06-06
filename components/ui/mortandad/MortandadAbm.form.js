import * as Yup from "yup";

export function initialValues(dato) {
  const { data } = dato;
  return {
    fecha: data?.fecha || "",
    NroCaravana: data?.NroCaravana || "",
    NroCaravanaMadre: data?.NroCaravanaMadre || "",
    NroCaravanaPadre: data?.NroCaravanaPadre || "",
    clasificacion: data?.clasificacion || "",
    causa_mortandad: data?.causa_mortandad || "",
  };
}

export function validationSchema() {
  return Yup.object({
    fecha: Yup.date().required(true),
    clasificacion: Yup.string().required(true),
    causa_mortandad: Yup.string().required(true),
  });
}
