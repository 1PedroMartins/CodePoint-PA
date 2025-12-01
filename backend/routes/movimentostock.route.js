const express = require("express");
const router = express.Router();
const controller = require("../controllers/movimentostock.controller");
const { verifyToken, requireRole } = require("../middleware/auth.middleware");

// Criar movimento manual (entrada/saída) — técnico
router.post("/", verifyToken, requireRole("tecnico"), controller.criar);

// Listar todos movimentos
router.get("/", verifyToken, requireRole("tecnico"), controller.listar);

// Movimentos associados a um stockLote
router.get("/lote/:stockLoteId", verifyToken, requireRole("tecnico"), controller.listarPorStockLote);

// Movimentos associados a uma entrega
router.get("/entrega/:entregaId", verifyToken, requireRole("tecnico"), controller.listarPorEntrega);

// Obter um movimento específico
router.get("/:id", verifyToken, requireRole("tecnico"), controller.obter);

// Apagar movimento (apenas admin)
router.delete("/:id", verifyToken, requireRole("admin"), controller.apagar);

module.exports = router;
