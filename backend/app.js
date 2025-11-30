require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares (devem vir antes das rotas)
app.use(cors());
app.use(express.json());

// Rotas
const produtoRoutes = require('./routes/produto.route');
app.use('/produto', produtoRoutes);

// Rota de teste
app.get("/", (req, res) => {
    res.json({ message: "API a funcionar! 🚀" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`##### Servidor a correr na porta ${PORT} #####`);
});

module.exports = app;
