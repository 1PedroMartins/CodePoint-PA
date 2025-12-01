const express = require("express");
const router = express.Router();
const controller = require("../controllers/stocklote.controller");
const { verifyToken, requireRole } = require("../middleware/auth.middleware");

// Criar lote de stock
router.post("/", verifyToken, requireRole("tecnico"), controller.criar);

// Obter lote
router.get("/:id", verifyToken, controller.obter);

// Atualizar lote
router.put("/:id", verifyToken, requireRole("tecnico"), controller.atualizar);

// Incrementar quantidade
router.post("/:id/incrementar", verifyToken, requireRole("tecnico"), controller.incrementar);

// Decrementar quantidade
router.post("/:id/decrementar", verifyToken, requireRole("tecnico"), controller.decrementar);

// Verificar validade
router.get("/:id/validade", verifyToken, controller.validade);

// Listar lotes por produto
router.get("/produto/:produtoId", verifyToken, controller.listarPorProduto);

// Apagar lote
router.delete("/:id", verifyToken, requireRole("admin"), controller.apagar);

module.exports = router;

