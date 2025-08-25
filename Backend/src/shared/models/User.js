const { DataTypes } = require("sequelize");
const sequelize = require("@/shared/config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    contrasena: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [8, 255],
      },
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    biografia: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    rol: {
      type: DataTypes.ENUM("USER", "ADMIN", "EDITOR"),
      allowNull: false,
      defaultValue: "USER",
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    verificado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    codigo_verificacion: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    expiracion_codigo: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);

module.exports = User;
