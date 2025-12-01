const express = require("express");
const router = express.Router();
const controller = require("../controllers/itementrega.controller");
const { verifyToken, requireRole } = require("../middleware/auth.middleware");

// Criar item numa entrega -> desconta stock
router.post(
  "/:entregaId",
  verifyToken,
  requireRole("tecnico"),
  controller.criar
);

// Listar itens de uma entrega
router.get(
  "/:entregaId",
  verifyToken,
  controller.listar
);

// Obter item específico
router.get(
  "/:entregaId/:itemId",
  verifyToken,
  controller.obter
);

// Repor o item ao stock (cancelamento)
router.post(
  "/:entregaId/:itemId/repor",
  verifyToken,
  requireRole("tecnico"),
  controller.repor
);

// Apagar item
router.delete(
  "/:entregaId/:itemId",
  verifyToken,
  requireRole("admin"),
  controller.apagar
);

module.exports = router;
