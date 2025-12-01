const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const { verifyToken, requireRole } = require("../middleware/auth.middleware");

// Criar utilizador (técnico ou admin)
router.post("/", verifyToken, requireRole("admin"), controller.criar);

// Listar utilizadores
router.get("/", verifyToken, requireRole("admin"), controller.listar);

// Obter utilizador
router.get("/:uid", verifyToken, controller.obter);

// Atualizar perfil
router.put("/:uid", verifyToken, controller.atualizarPerfil);

// Apagar utilizador
router.delete("/:uid", verifyToken, requireRole("admin"), controller.apagar);

module.exports = router;
