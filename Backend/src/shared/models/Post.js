const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Category = require("./Category");
const User = require("./Usuario");

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categorias",
        key: "id",
      },
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url_imagen: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fecha_publicacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    estado: {
      type: DataTypes.ENUM("BORRADOR", "PUBLICADO", "ARCHIVADO"),
      defaultValue: "BORRADOR",
    },
  },
  {
    tableName: "posts",
    timestamps: false,
  }
);

// Relaciones
Post.belongsTo(User, { foreignKey: "id_usuario" });
Post.belongsTo(Category, { foreignKey: "id_categoria" });

module.exports = Post;
