const emailHelpers = require("../../../shared/utils/email.helper");

const generate = (userData) => {
  const { nombre, email, reactivado } = userData;

  const subject = "Cuenta reactivada - StarWiki";

  const text = `Hola ${nombre}, tu cuenta de StarWiki (${email}) ha sido reactivada.`;

  const html = `
    ${emailHeplers.getEmailHeader()}
    <div style="${emailHeplers.getContainerStyles()}">
      <h1 style="color: #28a745; text-align: center;">Cuenta Reactivada</h1>
      <p>Hola <strong>${nombre}</strong>,</p>
      <p>Nos complace informarte que tu cuenta de StarWiki ha sido reactivada.</p>

      <p><strong>Correo asociado:</strong> ${email}</p>
      
      <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0; color: #155724;"><strong>✅ Cuenta reactivada el ${new Date(
          reactivado
        ).toLocaleDateString("es-ES")}</strong></p>
      </div>
      
      <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
      <p>¡Gracias por seguir con nosotros!</p>
      
      ${emailHeplers.getEmailFooter()}
    </div>
  `;

  return { subject, text, html };
};

module.exports = { generate };
