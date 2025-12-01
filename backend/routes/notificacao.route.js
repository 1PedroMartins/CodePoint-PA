const express = require('express');
const notificacaoController = require('../controllers/notificacao.controller');

const router = express.Router();

router.post('/criarNotificacao', notificacaoController.createNotificacao);
router.get('/:id', notificacaoController.getNotificacao);
router.get('/destinatario/:destinatarioId', notificacaoController.getNotificacoesByDestinatario);
router.get('/nao-lidas/:destinatarioId', notificacaoController.getNotificacoesNaoLidas);
router.patch('/:id', notificacaoController.updateNotificacao);
router.delete('/:id', notificacaoController.deleteNotificacao);

module.exports = router;