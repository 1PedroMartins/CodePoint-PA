const express = require("express");
const router = express.Router();
const controller = require("../controllers/notificacao.controller");
const { verifyToken, requireRole } = require("../middleware/auth.middleware");

// Criar notificação (técnico ou sistema)
router.post("/", verifyToken, requireRole("tecnico"), controller.criar);

// Listar notificações de um utilizador
router.get("/:destinatarioId", verifyToken, controller.listar);

// Obter notificação
router.get("/detalhe/:id", verifyToken, controller.obter);

// Marcar como lida
router.patch("/:id/lida", verifyToken, controller.marcarComoLida);

// Apagar notificação
router.delete("/:id", verifyToken, controller.apagar);

module.exports = router;
