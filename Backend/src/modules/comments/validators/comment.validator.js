const { check, validationResult } = require("express-validator");

const commentValidator = [
  check("id_post")
    .isInt({ min: 1 })
    .withMessage("El ID de post debe ser un número entero válido"),

  check("id_usuario")
    .isInt({ min: 1 })
    .withMessage("El ID de usuario debe ser un número entero válido"),

  check("contenido").notEmpty().withMessage("El contenido es obligatorio"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = commentValidator;
