import * as Yup from "yup";

export function initialValues() {
  return {
    from_name: "Pura Raza S.A.", //user name
    to_name: "franciscobenegas@gmail.com", //email id of the admin
    subject: "", // subject of email
    reply_to: "", // user email
    message: "http://localhost:3000/login/resuperarcontra", // message of email
  };
}

export function validationSchema() {
  return Yup.object({
    subject: Yup.string().required(true),
  });
}
