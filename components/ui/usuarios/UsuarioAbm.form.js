import * as Yup from "yup";
import { useAuth } from "@/hooks";

export function initialValues(data) {
  const { user } = useAuth();
  const establesimientoId = user.establesimiento.id;
  return {
    username: data?.username || "",
    email: data?.email || "",
    password: data?.password || "",
    role: "Authenticated",
    nombre: data?.nombre || "",
    apellido: data?.apellido || "",
    rol: data?.rol || "",
    establesimiento: establesimientoId,
  };
}

export function validationSchema(mode) {
  if (mode === "UPD") {
    return Yup.object({
      password: Yup.string().required(true).min(6),
    });
  } else {
    if (mode === "DLT") {
      return Yup.object({
        username: Yup.string().required(true),
        email: Yup.string().required(true),
        rol: Yup.string().required(true),
      });
    } else {
      return Yup.object({
        username: Yup.string().required(true),
        password: Yup.string().required(true),
        email: Yup.string().required(true),
        rol: Yup.string().required(true),
      });
    }
  }
}
