const service = require("../services/mensagem.service");

module.exports = {
  enviar: async (req, res) => {
    try {
      const mensagem = await service.enviarMensagem(req.params.chatId, {
        autorId: req.user.uid,
        conteudo: req.body.conteudo
      });

      res.status(201).json(mensagem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      const mensagens = await service.listarMensagens(req.params.chatId);
      res.json(mensagens);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  obter: async (req, res) => {
    try {
      const msg = await service.obterMensagem(req.params.chatId, req.params.mensagemId);
      if (!msg) return res.status(404).json({ error: "Mensagem não encontrada" });
      res.json(msg);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  marcarComoLida: async (req, res) => {
    try {
      const msg = await service.marcarComoLida(req.params.chatId, req.params.mensagemId);
      res.json(msg);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  apagar: async (req, res) => {
    try {
      await service.apagarMensagem(req.params.chatId, req.params.mensagemId);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
