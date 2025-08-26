const bcrypt = require("bcryptjs");

class UserBuilder {
  constructor() {
    this.user = {};
  }

  setNombre(nombre) {
    this.user.nombre = nombre;
    return this;
  }

  setApellido(apellido) {
    this.user.apellido = apellido;
    return this;
  }

  setEmail(email) {
    this.user.email = email;
    return this;
  }

  async setContrasena(contrasena) {
    const salt = await bcrypt.genSalt(10);
    this.user.contrasena = await bcrypt.hash(contrasena, salt);
    return this;
  }

  setAvatarUrl(avatar_url) {
    this.user.avatar_url = avatar_url;
    return this;
  }

  setBiografia(biografia) {
    this.user.biografia = biografia;
    return this;
  }

  setRol(rol) {
    this.user.rol = rol;
    return this;
  }

  setEstado(estado = true) {
    this.user.estado = estado;
    return this;
  }

  setVerificado(verificado = false) {
    this.user.verificado = verificado;
    return this;
  }

  setCodigoVerificacion(codigo_verificacion) {
    this.user.codigo_verificacion = codigo_verificacion;
    return this;
  }

  setExpiracionCodigo(expiracion_codigo) {
    this.user.expiracion_codigo = expiracion_codigo;
    return this;
  }

  build() {
    return this.user;
  }
}

module.exports = UserBuilder;
