const { db } = require("../config/firebase");
const itemEntregaService = require("./itementrega.service");

const collection = db.collection("entregas");

async function agendarEntrega(data) {
  const entrega = {
    beneficiarioId: data.beneficiarioId,
    tecnicoId: data.tecnicoId,
    dataAgendada: new Date(data.dataAgendada),
    dataRealizada: null,
    estado: "AGENDADA", // AGENDADA | PREPARACAO | PRONTA | ENTREGUE | NAO_RECOLHIDA
    criadoEm: new Date()
  };

  const docRef = await collection.add(entrega);
  return { id: docRef.id, ...entrega };
}

async function obterEntrega(id) {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;

  return { id: doc.id, ...doc.data() };
}

async function atualizarEntrega(id, data) {
  await collection.doc(id).update(data);
  return obterEntrega(id);
}

async function alterarEstado(id, novoEstado) {
  const updates = { estado: novoEstado };

  if (novoEstado === "ENTREGUE") {
    updates.dataRealizada = new Date();
  }

  await collection.doc(id).update(updates);
  return obterEntrega(id);
}

// associar item à entrega, descontar stock
async function adicionarItem(entregaId, data) {
  return await itemEntregaService.criarItemEntrega({
    entregaId,
    stockLoteId: data.stockLoteId,
    quantidade: data.quantidade,
    userId: data.userId
  });
}

async function listarEntregas() {
  const snap = await collection.get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function listarPorBeneficiario(beneficiarioId) {
  const snap = await collection.where("beneficiarioId", "==", beneficiarioId).get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function apagarEntrega(id) {
  // apagar itens associados
  const itensSnap = await collection.doc(id).collection("itens").get();
  for (const item of itensSnap.docs) {
    await item.ref.delete();
  }

  // apagar entrega
  await collection.doc(id).delete();
}

module.exports = {
  agendarEntrega,
  obterEntrega,
  atualizarEntrega,
  alterarEstado,
  adicionarItem,
  listarEntregas,
  listarPorBeneficiario,
  apagarEntrega
};
