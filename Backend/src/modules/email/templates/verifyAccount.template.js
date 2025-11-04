const emailHelpers = require("../../../shared/utils/email.helper");

const generate = (userData) => {
  const { nombre } = userData;

  const subject = "Cuenta Verificada - StarWiki";

  const text = `¡Felicidades ${nombre}! Tu cuenta ha sido verificada con éxito.`;

  const html = `
    ${emailHelpers.getEmailHeader()}
    <div style="${emailHelpers.getContainerStyles()}">
      <h1 style="color: #28a745; text-align: center;">¡Cuenta Verificada!</h1>
      <p>¡Felicidades <strong>${nombre}</strong>!</p>
      <p>Tu cuenta de StarWiki ha sido verificada exitosamente.</p>
      <p>Ya puedes acceder a todos nuestros servicios.</p>
      
      <div style="${emailHelpers.getSuccessBoxStyles()}">
        <p style="margin: 0; color: #155724;"><strong>✅ Verificación completada</strong></p>
      </div>
      
      <p>¡Gracias por elegirnos!</p>
      ${emailHelpers.getEmailFooter()}
    </div>
  `;

  return { subject, text, html };
};

module.exports = { generate };
