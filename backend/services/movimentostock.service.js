const { db } = require("../config/firebase.js");

function refLote(id) {
    return db.collection("stockLotes").doc(id);
}

function refMovimentos(id) {
    return refLote(id).collection("movimentosStock");
}

async function createMovimento(stockLoteId, data) {
    const payload = {
        tipo: data.tipo,
        quantidade: data.quantidade,
        userId: data.userId || null,
        motivo: data.motivo || null,
        data: new Date(),
        entregaId: data.entregaId || null
    };

    const ref = await refMovimentos(stockLoteId).add(payload);
    return { id: ref.id, ...payload };
}

async function getMovimento(stockLoteId, movimentoId) {
    const snap = await refMovimentos(stockLoteId).doc(movimentoId).get();
    return { id: snap.id, ...snap.data() };
}

async function getMovimentosByStockLote(stockLoteId) {
    const snap = await refMovimentos(stockLoteId)
        .orderBy("data", "desc")
        .get();

    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

module.exports = {
    createMovimento,
    getMovimento,
    getMovimentosByStockLote
};