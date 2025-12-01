const service = require("../services/campanha.service");

module.exports = {
  criar: async (req, res) => {
    try {
      const campanha = await service.criarCampanha(req.body);
      res.status(201).json(campanha);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      const campanhas = await service.listarCampanhas();
      res.json(campanhas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  obter: async (req, res) => {
    try {
      const campanha = await service.obterCampanha(req.params.id);
      if (!campanha) return res.status(404).json({ error: "Campanha não encontrada" });
      res.json(campanha);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const campanha = await service.atualizarCampanha(req.params.id, req.body);
      res.json(campanha);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  apagar: async (req, res) => {
    try {
      await service.apagarCampanha(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
