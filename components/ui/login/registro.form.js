import * as Yup from "yup";

export function initialValues() {
  return {
    nombre: "",
    apellido: "",
    username: "",
    email: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required(true),
    apellido: Yup.string().required(true),
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  });
}
