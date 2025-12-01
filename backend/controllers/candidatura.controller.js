const service = require("../services/candidatura.service");

module.exports = {
  criar: async (req, res) => {
    try {
      const candidatura = await service.criarCandidatura(req.body);
      res.status(201).json(candidatura);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      const lista = await service.listarCandidaturas();
      res.json(lista);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  obter: async (req, res) => {
    try {
      const candidatura = await service.obterCandidatura(req.params.id);
      if (!candidatura) return res.status(404).json({ error: "Candidatura não encontrada" });
      res.json(candidatura);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  avaliar: async (req, res) => {
    try {
      const candidatura = await service.avaliarCandidatura(req.params.id, req.body);
      if (!candidatura) return res.status(404).json({ error: "Candidatura não encontrada" });

      res.json(candidatura);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  apagar: async (req, res) => {
    try {
      await service.apagarCandidatura(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
