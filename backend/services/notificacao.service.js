const { db } = require("../config/firebase.js");

async function createNotificacao(data){
    const notificacao = await db.collection("notificacoes").add(data);
    return notificacao;
}

async function updateNotificacao(id, data){
    await db.collection("notificacoes").doc(id).update(data);
    return { id, ...data };
}

async function getNotificacao(id) {
    const doc = await db.collection("notificacoes").doc(id).get();
    return { id: doc.id, ...doc.data() };
}

async function getNotificacoesByDestinatario(destinatarioId) {
    const snapshot = await db.collection("notificacoes").where("destinatarioId", "==", destinatarioId).orderBy("dataEnvio", "desc").get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function getNotificacoesNaoLidas(destinatarioId) {
    const snapshot = await db.collection("notificacoes").where("destinatarioId", "==", destinatarioId).where("estado", "==", "nao_lida").orderBy("dataEnvio", "desc").get();
    
     return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function deleteNotificacao(id) {
    await db.collection("notificacoes").doc(id).delete();
    return { id, deleted: true };
}

module.exports = { 
    createNotificacao, 
    updateNotificacao, 
    getNotificacao, 
    getNotificacoesByDestinatario,
    getNotificacoesNaoLidas,
    deleteNotificacao 
};