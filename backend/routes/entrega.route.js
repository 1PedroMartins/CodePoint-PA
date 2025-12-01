const express = require("express");
const router = express.Router();
const controller = require("../controllers/entrega.controller");
const { verifyToken, requireRole } = require("../middleware/auth.middleware");

// Agendar entrega (técnico)
router.post("/", verifyToken, requireRole("tecnico"), controller.agendar);

// Listar todas as entregas (técnico)
router.get("/", verifyToken, requireRole("tecnico"), controller.listar);

// Listar entregas de um beneficiário (beneficiário ou técnico)
router.get("/beneficiario/:beneficiarioId", verifyToken, controller.listarPorBeneficiario);

// Obter entrega (beneficiário ou técnico)
router.get("/:id", verifyToken, controller.obter);

// Atualizar detalhes da entrega
router.put("/:id", verifyToken, requireRole("tecnico"), controller.atualizar);

// Alterar estado (AGENDADA → PREPARACAO → PRONTA → ENTREGUE)
router.patch("/:id/estado", verifyToken, requireRole("tecnico"), controller.alterarEstado);

// Adicionar um item à entrega (desconta stock)
router.post("/:id/itens", verifyToken, requireRole("tecnico"), controller.adicionarItem);

// Apagar entrega
router.delete("/:id", verifyToken, requireRole("admin"), controller.apagar);

module.exports = router;
