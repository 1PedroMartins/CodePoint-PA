const movimentoStockService = require('../services/movimentostock.service');

async function createMovimento(req, res) {
    try {
        const { stockLoteId } = req.params;

        const movimento = await movimentoStockService.createMovimento(stockLoteId, req.body);
        res.status(201).json(movimento);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar movimento", detalhes: error.message });
    }
}

async function getMovimento(req, res) {
    try {
        const { stockLoteId, movimentoId } = req.params;

        const movimento = await movimentoStockService.getMovimento(stockLoteId, movimentoId);
        res.status(200).json(movimento);
    } catch (error) {
        res.status(404).json({ error: "Movimento não encontrado" });
    }
}

async function getMovimentosByStockLote(req, res) {
    try {
        const movimentos = await movimentoStockService.getMovimentosByStockLote(req.params.stockLoteId);
        res.status(200).json(movimentos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar movimentos" });
    }
}

module.exports = {
    createMovimento,
    getMovimento,
    getMovimentosByStockLote
};