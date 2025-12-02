const { db } = require("../config/firebase");
const stockService = require("./stocklote.service");
const movService = require("./movimentostock.service");

async function criarItemEntrega({ entregaId, stockLoteId, quantidade, userId }) {
  // reduzir stock
  await stockService.decrementar(stockLoteId, quantidade);

  // registar movimento de saída
  await movService.registarMovimento({ // rever
    tipo: "SAIDA",
    quantidade,
    userId,
    motivo: "ENTREGA",
    entregaId,
    stockLoteId
  });

  // guardar item dentro da entrega
  const col = db.collection("entregas").doc(entregaId).collection("itens");

  const docRef = await col.add({
    stockLoteId,
    quantidade,
    criadoEm: new Date()
    // adicionar estado ??
  });

  return { id: docRef.id, stockLoteId, quantidade };
}

async function obterItem(entregaId, itemId) {
  const doc = await db.collection("entregas").doc(entregaId).collection("itens").doc(itemId).get();

  if (!doc.exists) return null;

  return { id: doc.id, ...doc.data() };
}

async function listarItensEntrega(entregaId) {
  const snap = await db.collection("entregas").doc(entregaId).collection("itens").get();

  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function reporAoStock(entregaId, itemId, userId) {
  const item = await obterItem(entregaId, itemId);
  if (!item) return null;

  // repor stock
  await stockService.incrementar(item.stockLoteId, item.quantidade);

  // registar movimento entrada
  await movService.registarMovimento({
    tipo: "ENTRADA",
    quantidade: item.quantidade,
    userId,
    motivo: "CANCELAMENTO_ENTREGA",
    entregaId,
    stockLoteId: item.stockLoteId
  });

  return item;
}

async function apagarItem(entregaId, itemId) {
  await db.collection("entregas").doc(entregaId).collection("itens").doc(itemId).delete();
}

module.exports = {
  criarItemEntrega,
  obterItem,
  listarItensEntrega,
  reporAoStock,
  apagarItem
};
