import * as Yup from "yup";
import numeral from "numeral";

export function initialValues(nombre, precio, dosAnhos) {
  var precioSeparador = numeral(precio);
  return {
    nombre,
    precio: precioSeparador.value(),
    dosAnhos,
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required(true),
    //precio: Yup.number().required(true),
  });
}
