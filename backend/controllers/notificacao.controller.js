const service = require("../services/notificacao.service");

module.exports = {
  criar: async (req, res) => {
    try {
      const notificacao = await service.criarNotificacao(req.body);
      res.status(201).json(notificacao);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      const lista = await service.listarNotificacoes(req.params.destinatarioId);
      res.json(lista);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  obter: async (req, res) => {
    try {
      const notif = await service.obterNotificacao(req.params.id);
      if (!notif) return res.status(404).json({ error: "Notificação não encontrada" });
      res.json(notif);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  marcarComoLida: async (req, res) => {
    try {
      const notif = await service.marcarComoLida(req.params.id);
      res.json(notif);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  apagar: async (req, res) => {
    try {
      await service.apagarNotificacao(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
