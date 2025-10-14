const { DataTypes } = require("sequelize");
const sequelize = require("@/shared/config/db");
const User = require("@/shared/models/User");
const Post = require("@/shared/models/Post");

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
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: "CURRENT_TIMESTAMP",
    },
    estado: {
      type: DataTypes.ENUM("BORRADOR", "PUBLICADO", "ARCHIVADO"),
      defaultValue: "BORRADOR",
    },
  },
  {
    tableName: "comentarios",
    updatedAt: "fecha_actualizacion",
    timestamps: false,
  }
);

// Relaciones
Comments.belongsTo(User, { foreignKey: "id_usuario" });
Comments.belongsTo(Post, { foreignKey: "id_post" });

module.exports = Comments;
