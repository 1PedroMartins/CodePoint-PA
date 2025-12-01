require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares (devem vir antes das rotas)
app.use(cors());
app.use(express.json());



// Rotas
const candidaturaRoutes = require('./routes/candidatura.route');
const stockLoteRoutes = require('./routes/stockLote.route');
const chatRoutes = require('./routes/chat.route');
const mensagemRoutes = require('./routes/mensagem.route');
const movimentoStockRoutes = require('./routes/movimentoStock.route');
const produtoRoutes = require('./routes/produto.route');
const campanhaRoutes = require('./routes/campanha.route');
const userRoutes = require('./routes/user.route');
const notificacaoRoutes = require('./routes/notificacao.route');

app.use('/candidatura',candidaturaRoutes)
app.use('/chat', chatRoutes)
app.use('/mensagem', mensagemRoutes)
app.use('/stocklote', stockLoteRoutes);
app.use('/movimentoStock', movimentoStockRoutes);
app.use('/produto', produtoRoutes);
app.use('/campanha', campanhaRoutes);
app.use('/user', userRoutes);
app.use('/notificacao', notificacaoRoutes);


// Rota de teste
app.get("/", (req, res) => {
    res.json({ message: "API a funcionar! 🚀" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`##### Servidor a correr na porta ${PORT} #####`);
});

module.exports = app;
