const emailHelpers = require("../../../shared/utils/email.helper");

const generate = (userData) => {
  const { nombre, rol } = userData;

  const subject =
    rol === "USER"
      ? "Bienvenido a StarWiki"
      : `Cuenta de ${rol} creada en StarWiki`;

  const text = `Hola ${nombre}, ${
    rol === "USER"
      ? "gracias por registrarte en StarWiki. Tu cuenta ha sido creada exitosamente."
      : `tu cuenta de ${rol} ha sido creada en StarWiki.`
  }`;

  const html = `
    ${emailHelpers.getEmailHeader()}
    <div style="${emailHelpers.getContainerStyles()}">
      <h1 style="${emailHelpers.getTitleStyles()}">
        ${
          rol === "USER"
            ? `¡Bienvenido ${nombre} a StarWiki!`
            : `¡Cuenta creada ${nombre}!`
        }
      </h1>
      <p>Tu cuenta ${
        rol === "USER" ? "" : `con rol de <strong>${rol}</strong>`
      } ha sido creada exitosamente.</p>
      ${
        rol === "USER"
          ? "<p>Para usar nuestros servicios, por favor activa tu cuenta.</p>"
          : "<p>Ya puedes comenzar a usar nuestros servicios.</p>"
      }
      <p>Gracias por elegirnos.</p>
      ${emailHelpers.getEmailFooter()}
    </div>
  `;

  return { subject, text, html };
};

module.exports = { generate };
