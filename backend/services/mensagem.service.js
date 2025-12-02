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
  await atualizarChat(id)

  return { id: docRef.id, ...mensagem };
}

async function listarMensagens(chatId) {
  const col = db.collection("chats").doc(chatId).collection("mensagens");
  const snap = await col.orderBy("timestamp", "asc").get();

  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function obterMensagem(chatId, mensagemId) {
  const doc = await db.collection("chats").doc(chatId).collection("mensagens").doc(mensagemId).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

async function marcarComoLida(chatId, mensagemId) {


  await db.collection("chats").doc(chatId).collection("mensagens").doc(mensagemId).update({lido: true});

  return obterMensagem(chatId, mensagemId);
}


/* ###### isto pode ser utilizado falta export controller e routes #####
async function marcarTodasComoLida(chatId, mensagemId) {

  const snapshot = await db.collection("chats").doc(chatId).collection("mensagens").where('lido', '==', false).get();

  const batch = db.batch();

  snapshot.forEach(msg => {
    batch.collection("chats").doc(chatId).collection("mensagens").doc(msg.id).update({lido: true});
  });

  await batch.commit();

  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}
*/



async function apagarMensagem(chatId, mensagemId) {
  await db.collection("chats")
    .doc(chatId)
    .collection("mensagens")
    .doc(mensagemId)
    .delete();
}

module.exports = {
  //marcarTodasComoLida,
  enviarMensagem,
  listarMensagens,
  obterMensagem,
  marcarComoLida,
  apagarMensagem
};
