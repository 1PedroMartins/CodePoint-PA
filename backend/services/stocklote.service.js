const { db } = require("../config/firebase");
const collection = db.collection("stockLotes");

// Função auxiliar para verificar validade
function isValido(validade) {
  const hoje = new Date();
  const v = new Date(validade);
  return v >= hoje;
}

async function criarStockLote(data) {
  const lote = {
    produtoId: data.produtoId,
    quantidadeAtual: data.quantidadeAtual || 0,
    validade: data.validade ? new Date(data.validade) : null,
    criadoEm: new Date()
  };

  const docRef = await collection.add(lote);
  return { id: docRef.id, ...lote };
}

async function obterStockLote(id) {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;

  return { id: doc.id, ...doc.data() };
}

async function atualizarStockLote(id, updates) {
  await collection.doc(id).update(updates);
  return obterStockLote(id);
}

async function incrementar(id, qtd) {
  const lote = await obterStockLote(id);
  const novaQtd = (lote.quantidadeAtual || 0) + qtd;

  await collection.doc(id).update({ quantidadeAtual: novaQtd });
  return obterStockLote(id);
}

async function decrementar(id, qtd) {
  const lote = await obterStockLote(id);

  if (!lote) throw new Error("Lote não encontrado");
  if (lote.quantidadeAtual < qtd) throw new Error("Stock insuficiente");

  const novaQtd = lote.quantidadeAtual - qtd;

  await collection.doc(id).update({ quantidadeAtual: novaQtd });
  return obterStockLote(id);
}

async function verificarValidade(id) {
  const lote = await obterStockLote(id);
  if (!lote || !lote.validade) return null;

  return isValido(lote.validade);
}

async function listarLotesPorProduto(produtoId) {
  const snap = await collection
    .where("produtoId", "==", produtoId)
    .get();

  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function apagarStockLote(id) {
  await collection.doc(id).delete();
}

module.exports = {
  criarStockLote,
  obterStockLote,
  atualizarStockLote,
  incrementar,
  decrementar,
  verificarValidade,
  listarLotesPorProduto,
  apagarStockLote
};
