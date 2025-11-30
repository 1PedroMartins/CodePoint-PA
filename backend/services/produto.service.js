const { db } = require("../config/firebase.js");

async function createProduto(data){
    return db.collection("produtos").add(data)
}

module.exports = { createProduto };