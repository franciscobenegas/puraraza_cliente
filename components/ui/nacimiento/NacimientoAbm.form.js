import * as Yup from "yup";

export function initialValues(dato) {
  const { data } = dato;
  const fecha = new Date().toISOString().slice(0, 10);
  return {
    fecha: data?.fecha || fecha,
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
    fecha: Yup.date().required(true),
    tipo_raza: Yup.string().required(true),
    sexo: Yup.string().required(true),
    tipo_Parto: Yup.string().required(true),
  });
}
