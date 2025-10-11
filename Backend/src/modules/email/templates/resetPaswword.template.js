const emailHelpers = require("@/shared/utils/email.helper");

const generate = (data) => {
  const { nombre } = data;

  const subject = "Contraseña actualizada - StarWiki";

  const text = `Hola ${nombre}, tu contraseña ha sido actualizada exitosamente.`;

  const html = `
      ${emailHelpers.getEmailHeader()}
      <div style="${emailHelpers.getContainerStyles()}">
        <h1 style="color: #28a745; text-align: center;">Contraseña Actualizada</h1>
        <p>Hola <strong>${nombre}</strong>,</p>
        
        <div style="${emailHelpers.getSuccessBoxStyles()}">
          <p style="margin: 0; color: #155724;">
            <strong>✅ Tu contraseña ha sido actualizada exitosamente</strong>
          </p>
        </div>
        
        <p>Ya puedes iniciar sesión con tu nueva contraseña.</p>
        
        <div style="background-color: #e2e3e5; border: 1px solid #d6d8db; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0; color: #383d41;">
            <strong>🔒 Medida de seguridad:</strong> Si no realizaste este cambio, 
            por favor contacta con nuestro equipo de soporte inmediatamente.
          </p>
        </div>
        ${emailHelpers.getEmailFooter()}
      </div>
    `;

  return { subject, text, html: emailHelpers.sanitizeHtml(html) };
};

module.exports = { generate };
