const express = require("express");
const router = express.Router();
const controller = require("../controllers/candidatura.controller");
const { verifyToken, requireRole } = require("../middleware/auth.middleware");

// Criar candidatura (beneficiário)
router.post("/", verifyToken, controller.criar);

// Listar candidaturas (técnico)
router.get("/", verifyToken, requireRole("tecnico"), controller.listar);

// Obter uma candidatura específica
router.get("/:id", verifyToken, controller.obter);

// Avaliar candidatura (técnico)
router.patch("/:id/avaliar", verifyToken, requireRole("tecnico"), controller.avaliar);

// Apagar candidatura (admin)
router.delete("/:id", verifyToken, requireRole("admin"), controller.apagar);

module.exports = router;
