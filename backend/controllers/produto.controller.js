const produtoService = require('../services/produto.service')

async function createProduto(req,res) {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Corpo da requisição vazio" });
        }

    const { nome, categoria } = req.body;
    const produto = await produtoService.createProduto(req.body)
         res.status(201).json(produto);
    } catch (error) {
        console.error("Erro ao criar Produto:", error);
    res.status(500).json({ error: "Erro ao criar Produto", detalhes: error.message });
    }
}

module.exports = {createProduto};