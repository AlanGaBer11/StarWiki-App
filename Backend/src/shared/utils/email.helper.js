const emailHelpers = {
  getEmailHeader: () => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>StarWiki</title>
      </head>
      <body>
    `,

  getEmailFooter: () => `
      <hr style="margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">
        Este es un correo automático, por favor no respondas.<br>
        Equipo de StarWiki
      </p>
      </body>
      </html>
    `,

  getContainerStyles: () => `
      font-family: Arial, sans-serif; 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 20px;
    `,

  getTitleStyles: () => `
      color: #333; 
      text-align: center;
    `,

  getCodeBoxStyles: () => `
      background-color: #f5f5f5; 
      padding: 20px; 
      text-align: center; 
      margin: 20px 0; 
      border-radius: 8px;
    `,

  getCodeStyles: () => `
      color: #007bff; 
      font-size: 36px; 
      margin: 0; 
      letter-spacing: 5px; 
      font-weight: bold;
    `,

  getSuccessBoxStyles: () => `
      background-color: #d4edda; 
      border: 1px solid #c3e6cb; 
      padding: 15px; 
      border-radius: 5px; 
      margin: 20px 0;
    `,

  validateEmailData: (data, requiredFields) => {
    const missing = requiredFields.filter((field) => !data[field]);
    if (missing.length > 0) {
      throw new Error(`Campos requeridos faltantes: ${missing.join(", ")}`);
    }
  },

  sanitizeHtml: (html) => {
    // Básica sanitización para emails
    return html.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ""
    );
  },
};

module.exports = emailHelpers;
