import * as Yup from "yup";

export function initialValues(dato) {
  const { data } = dato;
  return {
    fecha: data?.fecha || "",
    factura: data?.factura || "",
    clasificacion: data?.clasificacion || "",
    motivo_entrada: data?.motivo_entrada || "",
    cantidad: data?.cantidad || "",
  };
}

export function validationSchema() {
  return Yup.object({
    fecha: Yup.date().required(true),
    clasificacion: Yup.string().required(true),
    motivo_entrada: Yup.string().required(true),
    cantidad: Yup.number().required(true),
  });
}
