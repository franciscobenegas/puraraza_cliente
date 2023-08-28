var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function sendMail(subject, toEmail, otpText) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "franciscobenegas@gmail.com", //process.env.NODEMAILER_EMAIL,
      pass: "ipyxdgsxdzjjsafr", //process.env.NODEMAILER_PW,
    },
  });

  var mailOptions = {
    from: "franciscobenegas@gmail.com", //process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    text: otpText,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error(error);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}
