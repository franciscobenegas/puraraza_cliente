import * as Yup from "yup";

export function initialValues(dato) {
  const { data } = dato;
  const fecha = new Date().toISOString().slice(0, 10);
  return {
    fecha: data?.fecha || fecha,
    peso: data?.peso || "",
    clasificacion: data?.clasificacion || "",
    motivo_pesaje: data?.motivo_pesaje || "",
    caravana: data?.caravana || "",
  };
}

export function validationSchema() {
  return Yup.object({
    fecha: Yup.date().required(true),
    clasificacion: Yup.string().required(true),
    motivo_pesaje: Yup.string().required(true),
    peso: Yup.number().positive().required(true),
  });
}
