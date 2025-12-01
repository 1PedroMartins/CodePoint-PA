const campanhaService = require('../services/campanha.service');

async function createCampanha(req, res) {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Corpo da requisição vazio" });
        }

        const { titulo, descricao, dataInicio, dataFim, contactoOrganizador} = req.body;
        
        if (!titulo || !descricao || !dataFim) {
            return res.status(400).json({ error: "Atributos obrigatórios por preencher" });
        }

        const campanha = await campanhaService.createCampanha(req.body);
        res.status(201).json(campanha);
    } catch (error) {
        console.error("Erro ao criar Campanha:", error);
        res.status(500).json({ error: "Erro ao criar Campanha", detalhes: error.message });
    }
}

async function getCampanha(req, res) {
    try {
        const { id } = req.params;
        const campanha = await campanhaService.getCampanha(id);
        res.status(200).json(campanha);
    } catch (error) {
        console.error("Erro ao buscar Campanha:", error);
        res.status(404).json({ error: "Campanha não encontrado", detalhes: error.message });
    }
}

async function getCampanhasPorEstado(req, res) {
    try {
        const { estado } = req.params;
        const campanhas = await campanhaService.getCampanhasPorEstado(estado);
        res.status(200).json(campanhas);
    } catch (error) {
        console.error("Erro ao buscar Campanhas por estado:", error);
        res.status(500).json({ error: "Erro ao buscar Campanhas", detalhes: error.message });
    }
}

async function updateCampanha(req, res) {
    try {
        const { id } = req.params;
        
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Corpo da requisição vazio" });
        }

        const campanha = await campanhaService.updateCampanha(id, req.body);
        res.status(200).json(campanha);
    } catch (error) {
        console.error("Erro ao atualizar Campanha:", error);
        res.status(500).json({ error: "Erro ao atualizar Campanha", detalhes: error.message });
    }
}

async function deleteCampanha(req, res) {
    try {
        const { id } = req.params;
        const result = await campanhaService.deleteCampanha(id);
        res.status(200).json(result);
    } catch (error) {
        console.error("Erro ao eliminar Campanha:", error);
        res.status(500).json({ error: "Erro ao eliminar Campanha", detalhes: error.message });
    }
}

module.exports = { 
    createCampanha, 
    getCampanha,
    updateCampanha, 
    deleteCampanha,
    getCampanhasPorEstado,
};