const { db } = require("../config/firebase");
const collection = db.collection("notificacoes");

async function criarNotificacao(data) {
  const notificacao = {
    destinatarioId: data.destinatarioId,
    titulo: data.titulo,
    mensagem: data.mensagem,
    tipo: data.tipo || "INFO",
    estado: "NAO_LIDA",
    dataEnvio: new Date()
  };

  const docRef = await collection.add(notificacao);
  return { id: docRef.id, ...notificacao };
}

async function listarNotificacoes(destinatarioId) {
  const snap = await collection
    .where("destinatarioId", "==", destinatarioId)
    .orderBy("dataEnvio", "desc")
    .get();

  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function obterNotificacao(id) {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;

  return { id: doc.id, ...doc.data() };
}

async function marcarComoLida(id) {
  await collection.doc(id).update({ estado: "LIDA" });
  return obterNotificacao(id);
}

async function apagarNotificacao(id) {
  await collection.doc(id).delete();
}

module.exports = {
  criarNotificacao,
  listarNotificacoes,
  obterNotificacao,
  marcarComoLida,
  apagarNotificacao
};
