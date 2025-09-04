const { check, validationResult } = require("express-validator");

const postValidator = [
  check("id_usuario")
    .isInt({ min: 1 })
    .withMessage("El ID de usuario debe ser un número entero válido"),

  check("id_categoria")
    .isInt({ min: 1 })
    .withMessage("El ID de categoría debe ser un número entero válido"),

  check("titulo")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ max: 255 })
    .withMessage("El título no puede tener más de 255 caracteres"),

  check("contenido").notEmpty().withMessage("El contenido es obligatorio"),

  check("url_imagen")
    .notEmpty()
    .withMessage("La URL de la imagen es obligatoria")
    .isURL()
    .withMessage("La URL de la imagen no es válida"),

  check("estado")
    .optional()
    .isIn(["BORRADOR", "PUBLICADO", "ARCHIVADO"])
    .withMessage("El estado debe ser BORRADOR, PUBLICADO o ARCHIVADO"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = postValidator;
