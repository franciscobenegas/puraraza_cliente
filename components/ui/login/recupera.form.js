import * as Yup from "yup";

export function initialValues() {
  var texto = btoa("localhost:3000/login/resuperarcontra");
  return {
    from_name: "Pura Raza S.A.", //user name
    to_name: "", //email id of the admin
    subject: "", // subject of email
    reply_to: "", // user email
    message: "http://localhost:3000/login/resuperarcontrasenha", // message of email
  };
}

export function validationSchema() {
  return Yup.object({
    to_name: Yup.string().required(true),
    //message: Yup.string().required(true),
  });
}
