const emailHelpers = require("@/shared/utils/email.helper");

const generate = (userData) => {
  const { nombre, desactivado } = userData;

  const subject = "Cuenta desactivada - StarWiki";

  const text = `Hola ${nombre}, tu cuenta de StarWiki ha sido desactivada.`;

  const html = `
    ${emailHelpers.getEmailHeader()}
    <div style="${emailHelpers.getContainerStyles()}">
      <h1 style="color: #dc3545; text-align: center;">Cuenta Desactivada</h1>
      <p>Hola <strong>${nombre}</strong>,</p>
      <p>Te informamos que tu cuenta de StarWiki ha sido desactivada.</p>
      
      <div style="background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0; color: #721c24;"><strong>⚠️ Cuenta desactivada el ${new Date(
          desactivado
        ).toLocaleDateString("es-ES")}</strong></p>
      </div>
      
      <p>Para reactivar tu cuenta, por favor contacta con nuestro equipo de soporte.</p>
      <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
      ${emailHelpers.getEmailFooter()}
    </div>
  `;

  return { subject, text, html };
};

module.exports = { generate };
