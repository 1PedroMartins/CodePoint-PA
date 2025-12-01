const express = require("express");
const router = express.Router();
const controller = require("../controllers/mensagem.controller");
const { verifyToken, requireRole } = require("../middleware/auth.middleware");

// Enviar mensagem num chat
router.post("/:chatId", verifyToken, controller.enviar);

// Listar mensagens de um chat
router.get("/:chatId", verifyToken, controller.listar);

// Obter mensagem específica
router.get("/:chatId/:mensagemId", verifyToken, controller.obter);

// Marcar mensagem como lida
router.patch("/:chatId/:mensagemId/lida", verifyToken, controller.marcarComoLida);

// Apagar mensagem (apenas admin ou técnico)
router.delete("/:chatId/:mensagemId", verifyToken, requireRole("tecnico"), controller.apagar);

module.exports = router;
