require("dotenv").config();

const emailConfig = {
  service: "gmail",
  host: "smtp.gmail.com", // Agregar host explícito
  port: 587, // Puerto explícito
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Para desarrollo
  },
};
module.exports = emailConfig;
