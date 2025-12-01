const express = require('express');
const stockLoteController = require('../controllers/stocklote.controller');

const router = express.Router();

router.post('/criarStockLote', stockLoteController.createStockLote);
router.get('/:id', stockLoteController.getStockLote);
router.get('/produto/:produtoId', stockLoteController.getStockLotesByProduto);
router.patch('/:id', stockLoteController.updateStockLote);
router.delete('/:id', stockLoteController.deleteStockLote);

router.post('/:id/incrementar', stockLoteController.incrementarStock);
router.post('/:id/decrementar', stockLoteController.decrementarStock);
router.get('/:id/verificarValidade', stockLoteController.verificarValidade);

module.exports = router;