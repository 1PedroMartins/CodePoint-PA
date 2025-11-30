const { db } = require("../config/firebase.js");

async function createProduto(data){
    const produto = db.collection("produtos").add(data)

    return produto
}

async function updateProduto(id, data){
    const produto = db.collection("produtos").doc(id).update(data)

    return produto
}

async function getproduto(id) {
    const produto = db.collection("produtos").doc(id).get()
    return produto;
}

async function deleteProduto(id) {
    return db.collection("produtos").doc("id").delete();
}

module.exports = { createProduto, deleteProduto, getproduto,updateProduto };