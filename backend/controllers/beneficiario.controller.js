const service = require("../services/beneficiario.service");

module.exports = {
  criar: async (req, res) => {
    try {
      const beneficiario = await service.criarBeneficiario(req.body);
      res.status(201).json(beneficiario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      const lista = await service.listarBeneficiarios();
      res.json(lista);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  obter: async (req, res) => {
    try {
      const beneficiario = await service.obterBeneficiario(req.params.id);
      if (!beneficiario) return res.status(404).json({ error: "Beneficiário não encontrado" });
      res.json(beneficiario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const ben = await service.atualizarBeneficiario(req.params.id, req.body);
      res.json(ben);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  atualizarEstado: async (req, res) => {
    try {
      const ben = await service.atualizarEstado(req.params.id, req.body.estado);
      res.json(ben);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  adicionarObservacao: async (req, res) => {
    try {
      const ben = await service.adicionarObservacao(req.params.id, req.body.texto);
      res.json(ben);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  apagar: async (req, res) => {
    try {
      await service.apagarBeneficiario(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
