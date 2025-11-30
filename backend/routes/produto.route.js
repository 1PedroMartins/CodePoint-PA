const express = require('express');
const produtoController = require('../controllers/produto.controller');

const router = express.Router();

router.post('/criarProduto', produtoController.createProduto);
router.get('/:id', produtoController.getProduto);
router.patch('/:id', produtoController.updateProduto);
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;