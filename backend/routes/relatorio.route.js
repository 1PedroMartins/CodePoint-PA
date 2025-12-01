const express = require("express");
const router = express.Router();
const controller = require("../controllers/relatorio.controller");
const { verifyToken, requireRole } = require("../middleware/auth.middleware");

// Gerar relatório (só técnico/admin)
router.post("/", verifyToken, requireRole("tecnico"), controller.gerar);

// Listar relatórios
router.get("/", verifyToken, requireRole("tecnico"), controller.listar);

// Obter relatório
router.get("/:id", verifyToken, requireRole("tecnico"), controller.obter);

// Apagar relatório
router.delete("/:id", verifyToken, requireRole("admin"), controller.apagar);

module.exports = router;
