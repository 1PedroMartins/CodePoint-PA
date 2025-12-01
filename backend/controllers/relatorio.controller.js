const service = require("../services/relatorio.service");

module.exports = {
  gerar: async (req, res) => {
    try {
      const relatorio = await service.gerarRelatorio(req.body);
      res.status(201).json(relatorio);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      const relatorios = await service.listarRelatorios();
      res.json(relatorios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  obter: async (req, res) => {
    try {
      const relatorio = await service.obterRelatorio(req.params.id);
      if (!relatorio) return res.status(404).json({ error: "Relatório não encontrado" });
      res.json(relatorio);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  apagar: async (req, res) => {
    try {
      await service.apagarRelatorio(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
