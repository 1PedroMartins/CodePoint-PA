const service = require("../services/stocklote.service");

module.exports = {
  criar: async (req, res) => {
    try {
      const lote = await service.criarStockLote(req.body);
      res.status(201).json(lote);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  obter: async (req, res) => {
    try {
      const lote = await service.obterStockLote(req.params.id);
      if (!lote) return res.status(404).json({ error: "Stock lote não encontrado" });
      res.json(lote);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const lote = await service.atualizarStockLote(req.params.id, req.body);
      res.json(lote);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  incrementar: async (req, res) => {
    try {
      const lote = await service.incrementar(req.params.id, req.body.quantidade);
      res.json(lote);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  decrementar: async (req, res) => {
    try {
      const lote = await service.decrementar(req.params.id, req.body.quantidade);
      res.json(lote);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  validade: async (req, res) => {
    try {
      const valido = await service.verificarValidade(req.params.id);
      res.json({ valido });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listarPorProduto: async (req, res) => {
    try {
      const lotes = await service.listarLotesPorProduto(req.params.produtoId);
      res.json(lotes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  apagar: async (req, res) => {
    try {
      await service.apagarStockLote(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
