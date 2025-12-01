const userService = require('../services/user.service');

async function createUser(req, res) {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Corpo da requisição vazio" });
        }

        const { nome, email, cargo, telefone } = req.body;
        
        if (!nome || !email || !cargo) {
            return res.status(400).json({ error: "Nome, email e cargo são obrigatórios" });
        }

        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error("Erro ao criar User:", error);
        res.status(500).json({ error: "Erro ao criar User", detalhes: error.message });
    }
}

async function getUser(req, res) {
    try {
        const { id } = req.params;
        const user = await userService.getUser(id);
        res.status(200).json(user);
    } catch (error) {
        console.error("Erro ao buscar User:", error);
        res.status(404).json({ error: "User não encontrado", detalhes: error.message });
    }
}

async function getUserByEmail(req, res) {
    try {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        res.status(200).json(user);
    } catch (error) {
        console.error("Erro ao buscar User por email:", error);
        res.status(404).json({ error: "User não encontrado", detalhes: error.message });
    }
}

async function getUsersByCargo(req, res) {
    try {
        const { cargo } = req.params;
        const users = await userService.getUsersByCargo(cargo);
        res.status(200).json(users);
    } catch (error) {
        console.error("Erro ao buscar Users por cargo:", error);
        res.status(500).json({ error: "Erro ao buscar Users", detalhes: error.message });
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params;
        
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Corpo da requisição vazio" });
        }

        const user = await userService.updateUser(id, req.body);
        res.status(200).json(user);
    } catch (error) {
        console.error("Erro ao atualizar User:", error);
        res.status(500).json({ error: "Erro ao atualizar User", detalhes: error.message });
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const result = await userService.deleteUser(id);
        res.status(200).json(result);
    } catch (error) {
        console.error("Erro ao eliminar User:", error);
        res.status(500).json({ error: "Erro ao eliminar User", detalhes: error.message });
    }
}

module.exports = { 
    createUser, 
    getUser,
    getUserByEmail,
    getUsersByCargo,
    updateUser, 
    deleteUser 
};