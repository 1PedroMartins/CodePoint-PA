const { admin } = require("../config/firebase");

// Middleware para verificar se o token é válido
async function verifyToken(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // contém uid e role (claims)
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

// Middleware para verificar role
function requireRole(role) {
  return (req, res, next) => {
    const userRole = req.user.role; // definido no setCustomUserClaims

    if (!userRole) {
      return res.status(403).json({ error: "Role não encontrada (claims)." });
    }

    if (userRole !== role && userRole !== "admin") {
      return res.status(403).json({ error: "Permissão negada." });
    }

    next();
  };
}

module.exports = {
  verifyToken,
  requireRole
};
