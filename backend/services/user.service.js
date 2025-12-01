const { db } = require("../config/firebase.js");

async function createUser(data){
    const user = await db.collection("users").add(data);
    return user;
}

async function updateUser(id, data){
    await db.collection("users").doc(id).update(data);
    return { id, ...data };
}

async function getUser(id) {   //ver se este fuciona 
    const doc = await db.collection("users").doc(id).get();
    if (!doc.exists) {
        throw new Error("User não encontrado");
    }
    return { id: doc.id, ...doc.data() };
}

async function getUserByEmail(email) {   //ver se este fuciona 
    const snapshot = await db.collection("users").where("email", "==", email).limit(1).get();
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
}

async function getUsersByCargo(cargo) {
    const snapshot = await db.collection("users").where("cargo", "==", cargo).get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function deleteUser(id) {
    await db.collection("users").doc(id).delete();
    return { id, deleted: true };
}

module.exports = { 
    createUser, 
    updateUser, 
    getUser, 
    getUserByEmail,
    getUsersByCargo,
    deleteUser 
};