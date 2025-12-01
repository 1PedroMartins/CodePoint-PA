const { db } = require("../config/firebase");
const collection = db.collection("beneficiarios");

async function criarBeneficiario(data) {
  const beneficiario = {
    nome: data.nome,
    email: data.email,
    contacto: data.contacto,
    estadoCandidatura: data.estadoCandidatura || "PENDENTE",
    estadoBeneficiario: data.estadoBeneficiario || "ATIVO",
    observacoes: data.observacoes || "",
    dataRegisto: new Date()
  };

  const docRef = await collection.add(beneficiario);
  return { id: docRef.id, ...beneficiario };
}

async function listarBeneficiarios() {
  const snap = await collection.get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function obterBeneficiario(id) {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

async function atualizarBeneficiario(id, data) {
  await collection.doc(id).update(data);
  return obterBeneficiario(id);
}

async function atualizarEstado(id, novoEstado) {
  await collection.doc(id).update({ estadoBeneficiario: novoEstado });
  return obterBeneficiario(id);
}

async function adicionarObservacao(id, texto) {
  const ben = await obterBeneficiario(id);
  const novaObs = (ben.observacoes || "") + `\n${texto}`;
  
  await collection.doc(id).update({ observacoes: novaObs });
  return obterBeneficiario(id);
}

async function apagarBeneficiario(id) {
  await collection.doc(id).delete();
}

module.exports = {
  criarBeneficiario,
  listarBeneficiarios,
  obterBeneficiario,
  atualizarBeneficiario,
  atualizarEstado,
  adicionarObservacao,
  apagarBeneficiario
};
