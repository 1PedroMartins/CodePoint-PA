const service = require("../services/chat.service");

module.exports = {
  criar: async (req, res) => {
    try {
      const chat = await service.criarChat(req.body);
      res.status(201).json(chat);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      const chats = await service.listarChats();
      res.json(chats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listarPorBeneficiario: async (req, res) => {
    try {
      const lista = await service.listarChatsPorBeneficiario(req.params.beneficiarioId);
      res.json(lista);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  obter: async (req, res) => {
    try {
      const chat = await service.obterChat(req.params.id);
      if (!chat) return res.status(404).json({ error: "Chat não encontrado" });
      res.json(chat);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const chat = await service.atualizarChat(req.params.id, req.body);
      res.json(chat);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  fechar: async (req, res) => {
    try {
      const chat = await service.fecharChat(req.params.id);
      res.json(chat);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  apagar: async (req, res) => {
    try {
      await service.apagarChat(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
