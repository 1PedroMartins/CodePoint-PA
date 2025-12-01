const { db } = require("../config/firebase");
const collection = db.collection("campanhas");

async function criarCampanha(data) {
  const campanha = {
    titulo: data.titulo,
    descricao: data.descricao,
    dataInicio: data.dataInicio ? new Date(data.dataInicio) : null,
    dataFim: data.dataFim ? new Date(data.dataFim) : null,
    ativa: data.ativa ?? true,
    criadaEm: new Date()
  };

  const docRef = await collection.add(campanha);
  return { id: docRef.id, ...campanha };
}

async function listarCampanhas() {
  const snap = await collection.get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function obterCampanha(id) {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

async function atualizarCampanha(id, data) {
  await collection.doc(id).update(data);
  return obterCampanha(id);
}

async function apagarCampanha(id) {
  await collection.doc(id).delete();
}

module.exports = {
  criarCampanha,
  listarCampanhas,
  obterCampanha,
  atualizarCampanha,
  apagarCampanha
};
