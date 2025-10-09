const welcomeTemplate = require("@/modules/email/templates/welcome.template");
const verificationTemplate = require("@/modules/email/templates/verification.template");
const verifyAccountTemplate = require("@/modules/email/templates/verifyAccount.template");

class EmailTemplateService {
  static getWelcomeEmail(userData) {
    return welcomeTemplate.generate(userData);
  }

  static getVerificationEmail(userData) {
    return verificationTemplate.generate(userData);
  }

  static getVerifyAccountEmail(userData) {
    return verifyAccountTemplate.generate(userData);
  }

  static getTemplates(templateName, data) {
    const templates = {
      welcome: this.getWelcomeEmail,
      verification: this.getVerificationEmail,
      verifyAccount: this.getVerifyAccountEmail,
    };

    const templateFunction = templates[templateName];
    if (!templateFunction) {
      throw new Error(`Plantilla '${templateName}' no encontrada`);
    }
    return templateFunction(data);
  }
}

module.exports = EmailTemplateService;
