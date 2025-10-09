const RepositoryConfig = require("@/shared/config/repository");
const UserBuilder = require("@/modules/users/builders/user.builder");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("@/modules/email/services/email.service");
const TemplateService = require("@/modules/email/services/emailTemplate.service");

class AuthService {
  constructor() {
    this.AuthRepository = RepositoryConfig.getRepository("authRepository");
  }

  async register(userData) {
    try {
      const { nombre, apellido, nombre_usuario, email, contrasena } = userData;

      // Verificar que el usuario no exista por email
      const existingUser = await this.AuthRepository.findByEmail(email);
      if (existingUser) {
        throw new Error("El usuario ya está registrado con ese email");
      }

      // Aplicamos el builder
      const builder = new UserBuilder()
        .setNombre(nombre)
        .setApellido(apellido)
        .setNombreUsuario(nombre_usuario)
        .setEmail(email);

      if (contrasena) {
        await builder.setContrasena(contrasena);
      }

      const userToCreate = builder.build();

      // Creamos el usuario
      const createdUser = await this.AuthRepository.register(userToCreate);

      // Enviamos el correo de bienvenida
      try {
        const nombre = createdUser.nombre;
        const rol = createdUser.rol;
        const { subject, text, html } = TemplateService.getWelcomeEmail({
          nombre,
          rol,
        });
        await sendEmail(createdUser.email, subject, text, html);
      } catch (emailError) {
        console.error("Error al enviar el correo de bienvenida:", emailError);
      }
      return createdUser;
    } catch (error) {
      console.error("Error al registrar el usuario");
      throw error;
    }
  }

  async login(email, contrasena) {
    try {
      const user = await this.AuthRepository.findByEmail(email);
      if (!user) {
        throw new Error("El usuario no existe");
      }

      const isMatch = await bcrypt.compare(contrasena, user.contrasena);
      if (!isMatch) {
        throw new Error("Contraseña incorrecta");
      }

      return user;
    } catch (error) {
      console.error("Error al iniciar sesión");
      throw error;
    }
  }

  async sendVerificationCode(email) {
    try {
      const user = await this.AuthRepository.findByEmail(email);
      if (!user) {
        throw new Error("El usuario no existe");
      }

      if (user.verificado) {
        throw new Error("El usuario ya está verificado");
      }

      // Generar código de verificación (6 dígitos)
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      // Expiración en 15 minutos
      const codeExpiration = new Date();
      codeExpiration.setMinutes(codeExpiration.getMinutes() + 15);

      // Guardar
      await this.AuthRepository.verificationCode(
        email,
        verificationCode,
        codeExpiration
      );

      // Enviar correo con el código
      const { subject, text, html } = TemplateService.getVerificationEmail({
        nombre: user.nombre,
        apellido: user.apellido,
        codigo_verificacion: verificationCode,
        expiracion_codigo: codeExpiration,
      });

      await sendEmail(email, subject, text, html);

      return {
        message: "Código enviado correctamente",
        expiracion: codeExpiration,
      };
    } catch (error) {
      console.error("Error al enviar el código de verificación:", error);
      throw error;
    }
  }
}

module.exports = AuthService;
