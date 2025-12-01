const service = require("../services/movimentostock.service");

module.exports = {
  criar: async (req, res) => {
    try {
      const mov = await service.registarMovimento({
        tipo: req.body.tipo,
        quantidade: req.body.quantidade,
        userId: req.user.uid,
        motivo: req.body.motivo,
        entregaId: req.body.entregaId,
        stockLoteId: req.body.stockLoteId
      });

      res.status(201).json(mov);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      const movimentos = await service.listarMovimentos();
      res.json(movimentos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listarPorStockLote: async (req, res) => {
    try {
      const lista = await service.listarPorStockLote(req.params.stockLoteId);
      res.json(lista);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listarPorEntrega: async (req, res) => {
    try {
      const lista = await service.listarPorEntrega(req.params.entregaId);
      res.json(lista);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  obter: async (req, res) => {
    try {
      const mov = await service.obterMovimento(req.params.id);
      if (!mov) return res.status(404).json({ error: "Movimento não encontrado" });
      res.json(mov);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  apagar: async (req, res) => {
    try {
      await service.apagarMovimento(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
