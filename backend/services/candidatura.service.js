const { db } = require("../config/firebase");
const collection = db.collection("candidaturas");

async function criarCandidatura(data) {
  const candidatura = {
    beneficiarioId: data.beneficiarioId,
    documentoUrl: data.documentoUrl || null,
    estado: "PENDENTE",
    parecer: null,
    motivoCessacao: null,
    dataSubmissao: new Date(),
    dataDecisao: null
  };

  const docRef = await collection.add(candidatura);
  return { id: docRef.id, ...candidatura };
}

async function listarCandidaturas() {
  const snap = await collection.get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function obterCandidatura(id) {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

async function avaliarCandidatura(id, data) {
  const candidatura = await obterCandidatura(id);
  if (!candidatura) return null;

  const updates = {
    estado: data.estado,          // "APROVADA" ou "NEGADA"
    parecer: data.parecer || null,
    motivoCessacao: data.motivoCessacao || null,
    dataDecisao: new Date()
  };

  await collection.doc(id).update(updates);
  return obterCandidatura(id);
}

async function apagarCandidatura(id) {
  await collection.doc(id).delete();
}

module.exports = {
  criarCandidatura,
  listarCandidaturas,
  obterCandidatura,
  avaliarCandidatura,
  apagarCandidatura
};
