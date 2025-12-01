const { db } = require("../config/firebase.js");

async function createCampanha(data){
    const campanha = db.collection("campanhas").add(data)
    return campanha
}

async function updateCampanha(id, data){
    const campanha = db.collection("campanhas").doc(id).update(data)
    return campanha
}

async function getCampanha(id) {
    const campanha = db.collection("campanhas").doc(id).get()
    return campanha;
}

async function getCampanhasPorEstado(estado) {
    const snapshot = await db.collection("campanhas").where("estado", "==", estado).get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function deleteCampanha(id) {
    return db.collection("campanhas").doc("id").delete();
}

module.exports = { createCampanha, updateCampanha, getCampanha, deleteCampanha, getCampanhasPorEstado};