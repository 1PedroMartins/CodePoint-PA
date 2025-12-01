const express = require("express");
const router = express.Router();
const controller = require("../controllers/beneficiario.controller");
const { verifyToken, requireRole } = require("../middleware/auth.middleware");

// Criar beneficiário (técnico)
router.post("/", verifyToken, requireRole("tecnico"), controller.criar);

// Listar beneficiários
router.get("/", verifyToken, controller.listar);

// Obter beneficiário
router.get("/:id", verifyToken, controller.obter);

// Atualizar dados gerais
router.put("/:id", verifyToken, requireRole("tecnico"), controller.atualizar);

// Atualizar estado do beneficiário
router.patch("/:id/estado", verifyToken, requireRole("tecnico"), controller.atualizarEstado);

// Adicionar observação ao beneficiário
router.patch("/:id/observacoes", verifyToken, requireRole("tecnico"), controller.adicionarObservacao);

// Apagar beneficiário (apenas admin)
router.delete("/:id", verifyToken, requireRole("admin"), controller.apagar);

module.exports = router;
