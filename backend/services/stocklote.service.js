const { db } = require("../config/firebase.js");

function refLote(id) {
    return db.collection("stockLotes").doc(id);
}

// Criar lote
async function createStockLote(data) {
    const payload = {
        produtoId: data.produtoId,
        quantidadeAtual: data.quantidadeAtual || 0,
        validade: data.validade ? new Date(data.validade) : null,
        dataEntrada: new Date(),
        referenciaCampanhaId: data.referenciaCampanhaId || null
    };

    const loteRef = await db.collection("stockLotes").add(payload);

    // Criar movimento inicial (entrada)
    await loteRef.collection("movimentosStock").add({
        tipo: "entrada",
        quantidade: payload.quantidadeAtual,
        userId: data.userId || null,
        motivo: "criação_lote",
        data: new Date(),
        entregaId: null
    });

    return loteRef;
}

async function getStockLote(id) {
    return refLote(id).get();
}

async function getStockLotesByProduto(produtoId) {
    const snap = await db.collection("stockLotes")
        .where("produtoId", "==", produtoId)
        .get();

    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function updateStockLote(id, data) {
    await refLote(id).update(data);
    return { id, ...data };
}

async function deleteStockLote(id) {
    await refLote(id).delete();
    return { id, deleted: true };
}

// Incrementar
async function incrementarStock(id, quantidade, userId, motivo = "entrada", entregaId = null) {
    const loteRef = refLote(id);

    await db.runTransaction(async (t) => {
        const snap = await t.get(loteRef);
        const atual = snap.data().quantidadeAtual || 0;

        t.update(loteRef, { quantidadeAtual: atual + quantidade });

        t.set(loteRef.collection("movimentosStock").doc(), {
            tipo: "entrada",
            quantidade,
            userId,
            motivo,
            data: new Date(),
            entregaId
        });
    });

    return { id, incremento: quantidade };
}

// Decrementar
async function decrementarStock(id, quantidade, userId, motivo = "saida", entregaId = null) {
    const loteRef = refLote(id);

    await db.runTransaction(async (t) => {
        const snap = await t.get(loteRef);
        const atual = snap.data().quantidadeAtual || 0;

        if (atual < quantidade) throw new Error("Stock insuficiente");

        t.update(loteRef, { quantidadeAtual: atual - quantidade });

        t.set(loteRef.collection("movimentosStock").doc(), {
            tipo: "saida",
            quantidade,
            userId,
            motivo,
            data: new Date(),
            entregaId
        });
    });

    return { id, decremento: quantidade };
}

async function verificarValidade(id) {
    const lote = await getStockLote(id);
    const data = lote.data();

    if (!data.validade) return true;
    return new Date(data.validade) >= new Date();
}

module.exports = {
    createStockLote,
    getStockLote,
    getStockLotesByProduto,
    updateStockLote,
    deleteStockLote,
    incrementarStock,
    decrementarStock,
    verificarValidade
};