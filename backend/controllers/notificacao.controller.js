const notificacaoService = require('../services/notificacao.service');

async function createNotificacao(req, res) {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Corpo da requisição vazio" });
        }

        const { tipo, destinatarioId, titulo, mensagem } = req.body;
        
        if (!tipo || !destinatarioId || !titulo || !mensagem) {
            return res.status(400).json({ error: "Tipo, destinatarioId, titulo e mensagem são obrigatórios" });
        }

        const notificacao = await notificacaoService.createNotificacao(req.body);
        res.status(201).json(notificacao);
    } catch (error) {
        console.error("Erro ao criar Notificação:", error);
        res.status(500).json({ error: "Erro ao criar Notificação", detalhes: error.message });
    }
}

async function getNotificacao(req, res) {
    try {
        const { id } = req.params;
        const notificacao = await notificacaoService.getNotificacao(id);
        res.status(200).json(notificacao);
    } catch (error) {
        console.error("Erro ao buscar Notificação:", error);
        res.status(404).json({ error: "Notificação não encontrada", detalhes: error.message });
    }
}

async function getNotificacoesByDestinatario(req, res) {
    try {
        const { destinatarioId } = req.params;
        const notificacoes = await notificacaoService.getNotificacoesByDestinatario(destinatarioId);
        res.status(200).json(notificacoes);
    } catch (error) {
        console.error("Erro ao buscar Notificações:", error);
        res.status(500).json({ error: "Erro ao buscar Notificações", detalhes: error.message });
    }
}

async function getNotificacoesNaoLidas(req, res) {
    try {
        const { destinatarioId } = req.params;
        const notificacoes = await notificacaoService.getNotificacoesNaoLidas(destinatarioId);
        res.status(200).json(notificacoes);
    } catch (error) {
        console.error("Erro ao buscar Notificações não lidas:", error);
        res.status(500).json({ error: "Erro ao buscar Notificações", detalhes: error.message });
    }
}

async function updateNotificacao(req, res) {
    try {
        const { id } = req.params;
        
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Corpo da requisição vazio" });
        }

        const notificacao = await notificacaoService.updateNotificacao(id, req.body);
        res.status(200).json(notificacao);
    } catch (error) {
        console.error("Erro ao atualizar Notificação:", error);
        res.status(500).json({ error: "Erro ao atualizar Notificação", detalhes: error.message });
    }
}

async function deleteNotificacao(req, res) {
    try {
        const { id } = req.params;
        const result = await notificacaoService.deleteNotificacao(id);
        res.status(200).json(result);
    } catch (error) {
        console.error("Erro ao eliminar Notificação:", error);
        res.status(500).json({ error: "Erro ao eliminar Notificação", detalhes: error.message });
    }
}

module.exports = { 
    createNotificacao, 
    getNotificacao,
    getNotificacoesByDestinatario,
    getNotificacoesNaoLidas,
    updateNotificacao, 
    deleteNotificacao 
};