const { db } = require("../config/firebase");
const collection = db.collection("produtos");

async function criarProduto(data) {
  const docRef = await collection.add(data);
  return { id: docRef.id, ...data };
}

async function listarProdutos() {
  const snap = await collection.get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function obterProduto(id) {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

async function atualizarProduto(id, data) {
  await collection.doc(id).update(data);
  return obterProduto(id);
}

async function apagarProduto(id) {
  await collection.doc(id).delete();
}

module.exports = {
  criarProduto,
  listarProdutos,
  obterProduto,
  atualizarProduto,
  apagarProduto,
};
