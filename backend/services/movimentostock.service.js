const { db } = require("../config/firebase");
const collection = db.collection("movimentosStock");

async function registarMovimento(data) {
  const movimento = {
    tipo: data.tipo,                      // ENTRADA ou SAIDA
    quantidade: data.quantidade,
    userId: data.userId,
    motivo: data.motivo || null,
    entregaId: data.entregaId || null,
    stockLoteId: data.stockLoteId,
    data: new Date()
  };

  const docRef = await collection.add(movimento);
  return { id: docRef.id, ...movimento };
}

async function listarMovimentos() {
  const snap = await collection.orderBy("data", "desc").get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function listarPorStockLote(stockLoteId) {
  const snap = await collection
    .where("stockLoteId", "==", stockLoteId)
    .orderBy("data", "desc")
    .get();

  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function listarPorEntrega(entregaId) {
  const snap = await collection
    .where("entregaId", "==", entregaId)
    .orderBy("data", "desc")
    .get();

  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function obterMovimento(id) {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;

  return { id: doc.id, ...doc.data() };
}

async function apagarMovimento(id) {
  await collection.doc(id).delete();
}

module.exports = {
  registarMovimento,
  listarMovimentos,
  listarPorStockLote,
  listarPorEntrega,
  obterMovimento,
  apagarMovimento
};
