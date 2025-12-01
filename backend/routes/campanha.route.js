const express = require("express");
const router = express.Router();
const controller = require("../controllers/campanha.controller");
const { verifyToken, requireRole } = require("../middleware/auth.middleware");

// Criar campanha (apenas técnico/admin)
router.post("/", verifyToken, requireRole("tecnico"), controller.criar);

// Todas as campanhas (pode ser público ou autenticado)
router.get("/", controller.listar);

// Obter campanha
router.get("/:id", controller.obter);

// Atualizar campanha
router.put("/:id", verifyToken, requireRole("tecnico"), controller.atualizar);

// Apagar campanha (apenas admin)
router.delete("/:id", verifyToken, requireRole("admin"), controller.apagar);

module.exports = router;
