import * as Yup from "yup";

export function initialValues() {
  return {
    nombre: "",
    precio: 0,
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required(true),
    precio: Yup.number().required(true),
  });
}
