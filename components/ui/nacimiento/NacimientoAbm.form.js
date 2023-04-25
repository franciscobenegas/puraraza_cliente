import * as Yup from "yup";

export function initialValues(dato) {
  const { data } = dato;
  return {
    fecha: data?.fecha || "",
    tipo_raza: data?.tipo_raza || "",
    peso: data?.peso || "",
    sexo: data?.sexo || "",
    tipo_Parto: data?.tipo_Parto || "",
    nroCaravana: data?.nroCaravana || "",
    nroCaravanaMadre: data?.nroCaravanaMadre || "",
  };
}

export function validationSchema() {
  return Yup.object({
    //nombre: Yup.string().required(true),
    fecha: Yup.date().required(true),
    tipo_raza: Yup.string().required(true),
    sexo: Yup.string().required(true),
  });
}
