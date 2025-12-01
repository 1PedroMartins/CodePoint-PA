const service = require("../services/entrega.service");

module.exports = {
  agendar: async (req, res) => {
    try {
      const entrega = await service.agendarEntrega(req.body);
      res.status(201).json(entrega);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      const entregas = await service.listarEntregas();
      res.json(entregas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listarPorBeneficiario: async (req, res) => {
    try {
      const entregas = await service.listarPorBeneficiario(req.params.beneficiarioId);
      res.json(entregas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  obter: async (req, res) => {
    try {
      const entrega = await service.obterEntrega(req.params.id);
      if (!entrega) return res.status(404).json({ error: "Entrega não encontrada" });
      res.json(entrega);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const entrega = await service.atualizarEntrega(req.params.id, req.body);
      res.json(entrega);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  alterarEstado: async (req, res) => {
    try {
      const entrega = await service.alterarEstado(req.params.id, req.body.estado);
      res.json(entrega);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  adicionarItem: async (req, res) => {
    try {
      const item = await service.adicionarItem(req.params.id, req.body);
      res.status(201).json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  apagar: async (req, res) => {
    try {
      await service.apagarEntrega(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
