const emailHelpers = require("../../../shared/utils/email.helper");

const generate = (userData) => {
  const { nombre, apellido, codigo_verificacion } = userData;

  const subject = "Código de Verificación - StarWiki";

  const text = `Tu código de verificación es: ${codigo_verificacion}. Este código expira en 15 minutos.`;

  const html = `
    ${emailHelpers.getEmailHeader()}
    <div style="${emailHelpers.getContainerStyles()}">
      <h1 style="${emailHelpers.getTitleStyles()}">Código de Verificación</h1>
      <p>Hola <strong>${nombre} ${apellido}</strong>,</p>
      <p>Tu código de verificación para StarWiki es:</p>
      
      <div style="${emailHelpers.getCodeBoxStyles()}">
        <h2 style="${emailHelpers.getCodeStyles()}">${codigo_verificacion}</h2>
      </div>
      
      <p><strong>Este código expira en 15 minutos.</strong></p>
      <p>Si no solicitaste este código, puedes ignorar este correo.</p>
      ${emailHelpers.getEmailFooter()}
    </div>
  `;

  return { subject, text, html };
};

module.exports = { generate };
