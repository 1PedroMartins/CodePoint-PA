const { db } = require("../config/firebase");

async function gerarRelatorio({ tipo, inicio, fim }) {
  const inicioDate = new Date(inicio);
  const fimDate = new Date(fim);

  const resultado = {
    tipo,
    intervalo: { inicio: inicioDate, fim: fimDate },
    geradoEm: new Date(),
    dados: {}
  };

  // -------------------------
  // RELATORIO DE ENTREGAS
  // -------------------------
  if (tipo === "ENTREGAS" || tipo === "COMPLETO") {
    const snap = await db.collection("entregas")
      .where("dataRealizada", ">=", inicioDate)
      .where("dataRealizada", "<=", fimDate)
      .get();

    resultado.dados.totalEntregas = snap.size; //rever
  }

  // -------------------------
  // RELATORIO DE MOVIMENTOS DE STOCK
  // -------------------------
  if (tipo === "STOCK" || tipo === "COMPLETO") {
    const snap = await db.collection("movimentosStock")
      .where("data", ">=", inicioDate)
      .where("data", "<=", fimDate)
      .get();

    resultado.dados.movimentosStock = snap.size; //rever
  }

  // -------------------------
  // RELATORIO DE CANDIDATURAS
  // -------------------------
  if (tipo === "CANDIDATURAS" || tipo === "COMPLETO") {
    const snap = await db.collection("candidaturas")
      .where("dataSubmissao", ">=", inicioDate)
      .where("dataSubmissao", "<=", fimDate)
      .get();

    const candidaturas = snap.docs.map(d => d.data()); //rever

    resultado.dados.totalCandidaturas = candidaturas.length;
    resultado.dados.aprovadas = candidaturas.filter(c => c.estado === "APROVADA").length; //rever
    resultado.dados.negadas = candidaturas.filter(c => c.estado === "NEGADA").length; //rever
    resultado.dados.pendentes = candidaturas.filter(c => c.estado === "PENDENTE").length; //rever
  }

  // -------------------------
  // GUARDAR RELATORIO
  // -------------------------
  const docRef = await db.collection("relatorios").add(resultado);

  return { id: docRef.id, ...resultado };
}

async function listarRelatorios() {
  const snap = await db.collection("relatorios").orderBy("geradoEm", "desc").get();

  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function obterRelatorio(id) {
  const doc = await db.collection("relatorios").doc(id).get();
  if (!doc.exists) return null;

  return { id: doc.id, ...doc.data() };
}

async function apagarRelatorio(id) {
  await db.collection("relatorios").doc(id).delete();
}

module.exports = {
  gerarRelatorio,
  listarRelatorios,
  obterRelatorio,
  apagarRelatorio
};
