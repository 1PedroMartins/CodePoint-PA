const service = require("../services/itementrega.service");

module.exports = {
  criar: async (req, res) => {
    try {
      const item = await service.criarItemEntrega({
        entregaId: req.params.entregaId,
        stockLoteId: req.body.stockLoteId,
        quantidade: req.body.quantidade,
        userId: req.user.uid
      });

      res.status(201).json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      const itens = await service.listarItensEntrega(req.params.entregaId);
      res.json(itens);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  obter: async (req, res) => {
    try {
      const item = await service.obterItem(
        req.params.entregaId,
        req.params.itemId
      );

      if (!item)
        return res.status(404).json({ error: "Item da entrega não encontrado" });

      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  repor: async (req, res) => {
    try {
      const item = await service.reporAoStock(
        req.params.entregaId,
        req.params.itemId,
        req.user.uid
      );

      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  apagar: async (req, res) => {
    try {
      await service.apagarItem(req.params.entregaId, req.params.itemId);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
