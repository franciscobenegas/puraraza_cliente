import * as Yup from "yup";

export function initialValues(nombre) {
  return {
    nombre,
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required(true),
  });
}
