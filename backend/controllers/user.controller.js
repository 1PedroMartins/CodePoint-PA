const service = require("../services/user.service");

module.exports = {
  criar: async (req, res) => {
    try {
      const user = await service.criarUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      const users = await service.listarUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  obter: async (req, res) => {
    try {
      const user = await service.obterUser(req.params.uid);
      if (!user) return res.status(404).json({ error: "Utilizador não encontrado" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  atualizarPerfil: async (req, res) => {
    try {
      const user = await service.atualizarPerfil(req.params.uid, req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  apagar: async (req, res) => {
    try {
      await service.apagarUser(req.params.uid);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
