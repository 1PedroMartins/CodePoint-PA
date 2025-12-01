const { db } = require("../config/firebase");
const collection = db.collection("chats");

async function criarChat(data) {
  const chat = {
    beneficiarioId: data.beneficiarioId,
    participantes: data.participantes || [], // [uid_tecnico, uid_beneficiario]
    estado: "ABERTO",
    dataAbertura: new Date(),
    ultimaUpdate: new Date()
  };

  const docRef = await collection.add(chat);
  return { id: docRef.id, ...chat };
}

async function listarChats() {
  const snap = await collection.get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function listarChatsPorBeneficiario(beneficiarioId) {
  const snap = await collection.where("beneficiarioId", "==", beneficiarioId).get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function obterChat(id) {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

async function atualizarChat(id, data) {
  const updates = { ...data, ultimaUpdate: new Date() };
  await collection.doc(id).update(updates);
  return obterChat(id);
}

async function fecharChat(id) {
  await collection.doc(id).update({
    estado: "FECHADO",
    ultimaUpdate: new Date()
  });
  return obterChat(id);
}

async function apagarChat(id) {
  // apagar mensagens da subcoleção
  const mensagensSnap = await collection.doc(id).collection("mensagens").get();
  for (const msg of mensagensSnap.docs) {
    await msg.ref.delete();
  }

  // apagar o chat
  await collection.doc(id).delete();
}

module.exports = {
  criarChat,
  listarChats,
  listarChatsPorBeneficiario,
  obterChat,
  atualizarChat,
  fecharChat,
  apagarChat
};
