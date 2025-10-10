function validatePagination(query) {
  let page = parseInt(query.page) || 1;
  let limit = parseInt(query.limit) || 10;

  if (page < 1 || limit < 1) {
    throw new Error("Los valores de page y limit deben ser números positivos");
  }

  const maxLimit = 100;
  return { page, limit: limit > maxLimit ? maxLimit : limit };
}

function isOwnerOrAdmin(req, targetId) {
  return Number(req.user.id) === Number(targetId) || req.user.rol === "ADMIN";
}

function handleError(res, error, context) {
  console.error(`Error al ${context}:`, error);

  const status =
    error.status ||
    (error.message?.includes("no encontrado")
      ? 404
      : error.message?.includes("permiso")
      ? 403
      : 500);
  res.status(500).json({
    success: false,
    status,
    message: `Error interno del servidor al ${context}`,
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
}

module.exports = { validatePagination, isOwnerOrAdmin, handleError };
