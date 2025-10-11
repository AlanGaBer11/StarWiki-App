const welcomeTemplate = require("@/modules/email/templates/welcome.template");
const verificationTemplate = require("@/modules/email/templates/verification.template");
const verifyAccountTemplate = require("@/modules/email/templates/verifyAccount.template");
const deactivateUser = require("@/modules/email/templates/deactivate.template");
const reactivateUser = require("@/modules/email/templates/reactivate.template");
const resetPasswordTemplate = require("@/modules/email/templates/resetPaswword.template");

class EmailTemplateService {
  static getWelcomeEmail(userData) {
    return welcomeTemplate.generate(userData);
  }

  static getVerificationCodeEmail(userData) {
    return verificationTemplate.generate(userData);
  }

  static getVerifyAccountEmail(userData) {
    return verifyAccountTemplate.generate(userData);
  }

  static getDeactivateUserEmail(userData) {
    return deactivateUser.generate(userData);
  }

  static getReactivateUserEmail(userData) {
    return reactivateUser.generate(userData);
  }

  static getResetPasswordEmail(userData) {
    return resetPasswordTemplate.generate(userData);
  }

  static getTemplates(templateName, data) {
    const templates = {
      welcome: this.getWelcomeEmail,
      verification: this.getVerificationCodeEmail,
      verifyAccount: this.getVerifyAccountEmail,
      deactivate: this.getReactivateUserEmail,
      reactivate: this.getReactivateUserEmail,
      resetPassword: this.getResetPasswordEmail,
    };

    const templateFunction = templates[templateName];
    if (!templateFunction) {
      throw new Error(`Plantilla '${templateName}' no encontrada`);
    }
    return templateFunction(data);
  }
}

module.exports = EmailTemplateService;
