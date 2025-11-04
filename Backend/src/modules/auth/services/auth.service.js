const RepositoryConfig = require("../../../shared/config/repository");
const UserBuilder = require("../../users/builders/user.builder");
const { sendEmail } = require("../../email/services/email.service");
const TemplateService = require("../../email/services/emailTemplate.service");
const bcrypt = require("bcryptjs");

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
        throw new Error("Usuario no encontrado");
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
        throw new Error("Usuario no encontrado");
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

      try {
        // Enviar correo con el código
        const { subject, text, html } =
          TemplateService.getVerificationCodeEmail({
            nombre: user.nombre,
            apellido: user.apellido,
            codigo_verificacion: verificationCode,
            expiracion_codigo: codeExpiration,
          });

        await sendEmail(email, subject, text, html);
      } catch (emailError) {
        console.error("Error al enviar el correo de verificación:", emailError);
        throw emailError;
      }
    } catch (error) {
      console.error("Error al enviar el código de verificación:", error);
      throw error;
    }
  }

  async verifiAccount(email, code) {
    try {
      const user = await this.AuthRepository.findByEmail(email);

      // Buscar usuario
      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      //Verificar si el usuario ya esta verificado
      if (user.verificado) {
        throw new Error("El usuario ya está verificado");
      }

      // Verificar si hay un código pendiente
      if (!user.codigo_verificacion) {
        throw new Error("No hay un código de verificación pendiente");
      }

      // Verificar expiración
      if (user.expiracion_codigo && new Date() > user.expiracion_codigo) {
        await this.AuthRepository.verifyUser(email, {
          // Limpiar código
          codigo_verificacion: null,
          expiracion_codigo: null,
        });
        throw new Error("El código de verificación ha expirado");
      }

      // Verificar que el código coincida
      if (user.codigo_verificacion !== code) {
        throw new Error("Código de verificación inválido");
      }

      // Verificar el usuario
      await this.AuthRepository(email, {
        verificado: true,
        codigo_verificacion: null,
        expiracion_codigo: null,
      });

      // Enviar correo de confirmación
      try {
        const { subject, text, html } = TemplateService.getVerifyAccountEmail({
          nombre: user.nombre,
          email: user.email,
        });

        await sendEmail(user.email, subject, text, html);
      } catch (emailError) {
        console.error("Error al enviar el correo de confirmación:", emailError);
        throw emailError;
      }
    } catch (error) {
      console.error("Error al verificar la cuenta", error);
      throw error;
    }
  }

  async resetPassword(email, code, newPassword) {
    try {
      // Buscar usuario
      const user = await this.AuthRepository.findByEmail(email);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      // Verificar si hay un código pendiente
      if (!user.codigo_verificacion) {
        throw new Error("No hay un código de verificación pendiente");
      }

      // Verificar expiración
      if (user.expiracion_codigo && new Date() > user.expiracion_codigo) {
        await this.AuthRepository.resetPassword(email, {
          // Limpiar código
          codigo_verificacion: null,
          expiracion_codigo: null,
        });
        throw new Error("El código de verificación ha expirado");
      }

      // Verificar que el código coincida
      if (user.codigo_verificacion !== code) {
        throw new Error("Código de verificación inválido");
      }

      // Hashear la nueva contraseña
      const salt = await bcrypt.genSalt(10);
      const hasedPassword = await bcrypt.hash(newPassword, salt);

      // Actualizar contraseña
      await this.AuthRepository.resetPassword(email, {
        contrasena: hasedPassword,
        codigo_verificacion: null,
        expiracion_codigo: null,
      });
      // Enviar correo de restablecimiento
      try {
        const { subject, text, html } = TemplateService.getResetPasswordEmail({
          nombre: user.nombre,
          email: user.email,
        });

        await sendEmail(user.email, subject, text, html);
      } catch (emailError) {
        console.error(
          "Error al enviar el correo de restablecimiento:",
          emailError
        );
        throw emailError;
      }
    } catch (error) {
      console.error("Error al restablecer la contraseña", error);
      throw error;
    }
  }
}

module.exports = AuthService;
