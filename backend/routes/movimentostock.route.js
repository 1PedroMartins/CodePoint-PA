const express = require('express');
const movimentoStockController = require('../controllers/movimentostock.controller');

const router = express.Router();

router.post('/:stockLoteId/criarMovimento', movimentoStockController.createMovimento);
router.get('/:stockLoteId', movimentoStockController.getMovimentosByStockLote);
router.get('/:stockLoteId/:movimentoId', movimentoStockController.getMovimento);

module.exports = router;