const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./Usuario");
const Post = require("./Post");

const Comments = sequelize.define(
  "Comments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "posts",
        key: "id",
      },
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha_comentario: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "comentarios",
    timestamps: false,
  }
);

// Relaciones
Comments.belongsTo(User, { foreignKey: "id_usuario" });
Comments.belongsTo(Post, { foreignKey: "id_post" });

module.exports = Comments;
