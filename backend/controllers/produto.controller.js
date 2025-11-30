const produtoService = require('../services/produto.service');

async function createProduto(req, res) {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Corpo da requisição vazio" });
        }

        const { nome, categoria } = req.body;
        
        if (!nome || !categoria) {
            return res.status(400).json({ error: "Nome e categoria são obrigatórios" });
        }

        const produto = await produtoService.createProduto(req.body);
        res.status(201).json(produto);
    } catch (error) {
        console.error("Erro ao criar Produto:", error);
        res.status(500).json({ error: "Erro ao criar Produto", detalhes: error.message });
    }
}

async function getProduto(req, res) {
    try {
        const { id } = req.params;
        const produto = await produtoService.getProduto(id);
        res.status(200).json(produto);
    } catch (error) {
        console.error("Erro ao buscar Produto:", error);
        res.status(404).json({ error: "Produto não encontrado", detalhes: error.message });
    }
}

async function updateProduto(req, res) {
    try {
        const { id } = req.params;
        
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Corpo da requisição vazio" });
        }

        const produto = await produtoService.updateProduto(id, req.body);
        res.status(200).json(produto);
    } catch (error) {
        console.error("Erro ao atualizar Produto:", error);
        res.status(500).json({ error: "Erro ao atualizar Produto", detalhes: error.message });
    }
}

async function deleteProduto(req, res) {
    try {
        const { id } = req.params;
        const result = await produtoService.deleteProduto(id);
        res.status(200).json(result);
    } catch (error) {
        console.error("Erro ao eliminar Produto:", error);
        res.status(500).json({ error: "Erro ao eliminar Produto", detalhes: error.message });
    }
}

module.exports = { 
    createProduto, 
    getProduto, 
    updateProduto, 
    deleteProduto 
};