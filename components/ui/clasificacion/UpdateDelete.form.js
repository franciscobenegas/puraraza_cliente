import * as Yup from "yup";
import numeral from "numeral";

export function initialValues(nombre, precio) {
  var precioSeparador = numeral(precio);
  return {
    nombre,
    precio: precioSeparador.value(),
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required(true),
    precio: Yup.number().required(true),
  });
}
