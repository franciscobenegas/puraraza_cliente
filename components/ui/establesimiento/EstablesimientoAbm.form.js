import * as Yup from "yup";

export function initialValues(body) {
  const { data } = body;
  return {
    nombre: data?.nombre || "",
    ruc: data?.ruc || "",
    direccion: data?.direccion || "",
    telefono: data?.telefono || "",
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required(true),
    ruc: Yup.string().required(true),
    direccion: Yup.string().required(true),
    telefono: Yup.string().required(true),
  });
}
