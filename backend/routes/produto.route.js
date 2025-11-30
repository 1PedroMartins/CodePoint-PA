const express = require('express');

const produtoController = require('../controllers/produto.controller')

const router = express.Router();


router.post('/criarProduto',produtoController.createProduto);

module.exports = router;