const express = require("express");
const router = express.Router();
const controller = require("../controllers/chat.controller");
const { verifyToken, requireRole } = require("../middleware/auth.middleware");

// Criar chat (beneficiário ou técnico)
router.post("/", verifyToken, controller.criar);

// Listar todos os chats (técnico)
router.get("/", verifyToken, requireRole("tecnico"), controller.listar);

// Listar chats de um beneficiário
router.get("/beneficiario/:beneficiarioId", verifyToken, controller.listarPorBeneficiario);

// Obter chat específico
router.get("/:id", verifyToken, controller.obter);

// Atualizar chat (ex: adicionar participante)
router.put("/:id", verifyToken, controller.atualizar);

// Fechar chat (técnico)
router.patch("/:id/fechar", verifyToken, requireRole("tecnico"), controller.fechar);

// Apagar chat (admin)
router.delete("/:id", verifyToken, requireRole("admin"), controller.apagar);

module.exports = router;
