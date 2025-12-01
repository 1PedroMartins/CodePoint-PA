const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/beneficiarios", require("./routes/beneficiario.route"));
app.use("/campanhas", require("./routes/campanha.route"));
app.use("/candidaturas", require("./routes/candidatura.route"));
app.use("/chats", require("./routes/chat.route"));
app.use("/entregas", require("./routes/entrega.route"));
app.use("/itens-entrega", require("./routes/itementrega.route"));
app.use("/mensagens", require("./routes/mensagem.route"));
app.use("/movimentos-stock", require("./routes/movimentostock.route"));
app.use("/notificacoes", require("./routes/notificacao.route"));
app.use("/produtos", require("./routes/produto.route"));
app.use("/relatorios", require("./routes/relatorio.route"));
app.use("/stock-lotes", require("./routes/stocklote.route"));
app.use("/users", require("./routes/user.route"));

// Route base
app.get("/", (req, res) => {
  res.send("API do Projeto — Backend está a funcionar! 🚀");
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});

module.exports = app;
