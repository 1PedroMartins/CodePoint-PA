const { db } = require("../config/firebase");

async function enviarMensagem(chatId, data) {
  const col = db.collection("chats").doc(chatId).collection("mensagens");

  const mensagem = {
    autorId: data.autorId,
    conteudo: data.conteudo,
    timestamp: new Date(),
    lido: false
  };

  const docRef = await col.add(mensagem);

  // atualizar última atividade do chat
  await db.collection("chats").doc(chatId).update({
    ultimaUpdate: new Date()
  });

  return { id: docRef.id, ...mensagem };
}

async function listarMensagens(chatId) {
  const col = db.collection("chats").doc(chatId).collection("mensagens");
  const snap = await col.orderBy("timestamp", "asc").get();

  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function obterMensagem(chatId, mensagemId) {
  const doc = await db
    .collection("chats").doc(chatId)
    .collection("mensagens").doc(mensagemId)
    .get();

  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

async function marcarComoLida(chatId, mensagemId) {
  await db.collection("chats")
    .doc(chatId)
    .collection("mensagens")
    .doc(mensagemId)
    .update({
      lido: true
    });

  return obterMensagem(chatId, mensagemId);
}

async function apagarMensagem(chatId, mensagemId) {
  await db.collection("chats")
    .doc(chatId)
    .collection("mensagens")
    .doc(mensagemId)
    .delete();
}

module.exports = {
  enviarMensagem,
  listarMensagens,
  obterMensagem,
  marcarComoLida,
  apagarMensagem
};
