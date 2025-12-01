const express = require('express');
const campanhaController = require('../controllers/campanha.controller');

const router = express.Router();

router.post('/criarCampanha', campanhaController.createCampanha);
router.get('/:id', campanhaController.getCampanha);
router.get('/estado/:estado', campanhaController.getCampanhasEstado);
router.patch('/:id', campanhaController.updateCampanha);
router.delete('/:id', campanhaController.deleteCampanha);

module.exports = router;