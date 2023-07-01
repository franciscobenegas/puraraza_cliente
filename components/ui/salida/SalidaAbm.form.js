import * as Yup from "yup";

export function initialValues(dato) {
  const { data } = dato;
  const fecha = new Date().toISOString().slice(0, 10);
  return {
    fecha: data?.fecha || fecha,
    factura: data?.factura || "",
    clasificacion: data?.clasificacion || "",
    motivo_salida: data?.motivo_salida || "",
    cantidad: data?.cantidad || "",
    //stock: 0,
  };
}

export function validationSchema() {
  return Yup.object({
    fecha: Yup.date().required(true),
    clasificacion: Yup.string().required(true),
    motivo_salida: Yup.string().required(true),
    cantidad: Yup.number().positive().required(true),
    //stock: Yup.number().min(0),
  });
}
