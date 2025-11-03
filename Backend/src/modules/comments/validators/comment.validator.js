const { check, validationResult } = require("express-validator");

const commentValidator = [
  check("titulo_post")
    .notEmpty()
    .withMessage("El titulo del post es obligatorio"),

  /*   check("nombre_usuario")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio"), */

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
