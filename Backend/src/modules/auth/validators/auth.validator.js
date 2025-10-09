const { check, validationResult } = require("express-validator");

const authValidator = [
  check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email debe de ser valido")
    .isLength({ min: 5 })
    .withMessage("El email debe tener al menos 5 caracteres")
    .trim(),

  check("contrasena")
    .notEmpty()
    .withMessage("La contraseña e obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe de tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe de tener al menos una mayuscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe de tener al menos una minuscula")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("La contraseña debe de tener al menos un caracter especial")

    .custom((value) => {
      // Verificar numeros consicutivs
      for (let i = 0; i < value.length - 1; i++) {
        const current = parseInt(value[i]);
        const next = parseInt(value[i + 1]);

        if (!isNaN(current) && !isNaN(next) && next === current + 1) {
          throw new Error(
            "La contraseña no debe de contener números consecutivos"
          );
        }
      }

      // Verificar letras consecutivas
      const lowerValue = value.toLowerCase();
      for (let i = 0; i < lowerValue.length - 1; i++) {
        const current = lowerValue.charCodeAt(i);
        const next = lowerValue.charCodeAt(i + 1);

        // Verificar solo si son letras y son consecutivas en el abecedario
        if (
          current >= 97 &&
          current <= 122 &&
          next >= 97 &&
          next <= 122 &&
          next === current + 1
        ) {
          throw new Error(
            "La contraseña no debe contener letras consecutivas del abecedario"
          );
        }
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        status: 400,
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = authValidator;
