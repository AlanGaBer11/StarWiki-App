const nodemailer = require("nodemailer");
const emailConfig = require("../../../shared/config/email");

const transporter = nodemailer.createTransport(emailConfig);

// Verificar la configuración del transporter
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Error en configuración de email:", error);
  } else {
    console.log("✅ Servidor de email configurado correctamente");
  }
});

// FUNCIÓN PARA ENVIAR CORREOS
const sendEmail = async (to, subject, text, html) => {
  try {
    // Validar parámetros requeridos
    if (!to) {
      throw new Error("El destinatario (to) es requerido");
    }
    if (!subject) {
      throw new Error("El asunto (subject) es requerido");
    }

    const mailOptions = {
      from: `"StarWiki" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    console.log(`📧 Enviando correo a: ${to} con asunto: ${subject}`);

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado exitosamente:", info.messageId);

    return {
      success: true,
      message: "Correo enviado correctamente",
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error.message);

    // Lanzar el error para que lo maneje el servicio que lo llama
    throw new Error(`Error al enviar email: ${error.message}`);
  }
};

module.exports = { sendEmail };
