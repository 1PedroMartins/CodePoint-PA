const stockLoteService = require('../services/stocklote.service');

async function createStockLote(req, res) {
    try {
        const { produtoId } = req.body;
        if (!produtoId) return res.status(400).json({ error: "produtoId é obrigatório" });

        const lote = await stockLoteService.createStockLote(req.body);
        res.status(201).json(lote);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar StockLote", detalhes: error.message });
    }
}

async function getStockLote(req, res) {
    try {
        const lote = await stockLoteService.getStockLote(req.params.id);
        res.status(200).json({ id: lote.id, ...lote.data() });
    } catch (error) {
        res.status(404).json({ error: "StockLote não encontrado" });
    }
}

async function getStockLotesByProduto(req, res) {
    try {
        const lotes = await stockLoteService.getStockLotesByProduto(req.params.produtoId);
        res.status(200).json(lotes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar StockLotes" });
    }
}

async function updateStockLote(req, res) {
    try {
        const lote = await stockLoteService.updateStockLote(req.params.id, req.body);
        res.status(200).json(lote);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar StockLote" });
    }
}

async function deleteStockLote(req, res) {
    try {
        const result = await stockLoteService.deleteStockLote(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Erro ao eliminar StockLote" });
    }
}

async function incrementarStock(req, res) {
    try {
        const { quantidade, userId, motivo, entregaId } = req.body;
        const result = await stockLoteService.incrementarStock(
            req.params.id,
            quantidade,
            userId,
            motivo,
            entregaId
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function decrementarStock(req, res) {
    try {
        const { quantidade, userId, motivo, entregaId } = req.body;
        const result = await stockLoteService.decrementarStock(
            req.params.id,
            quantidade,
            userId,
            motivo,
            entregaId
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function verificarValidade(req, res) {
    try {
        const valido = await stockLoteService.verificarValidade(req.params.id);
        res.status(200).json({ valido });
    } catch (error) {
        res.status(500).json({ error: "Erro ao verificar validade" });
    }
}

module.exports = {
    createStockLote,
    getStockLote,
    getStockLotesByProduto,
    updateStockLote,
    deleteStockLote,
    incrementarStock,
    decrementarStock,
    verificarValidade
};