const { db, admin } = require("../config/firebase");
const collection = db.collection("users");

async function criarUser(data) {
  // Criar utilizador no Firebase Auth
  const fbUser = await admin.auth().createUser({
    email: data.email,
    password: data.password,
    displayName: data.nome
  });

  const userData = {
    uid: fbUser.uid,
    nome: data.nome,
    email: data.email,
    role: data.role || "beneficiario", // técnico | admin | beneficiário
    contacto: data.contacto || null,
    criadoEm: new Date()
  };

  // Guardar no Firestore
  await collection.doc(fbUser.uid).set(userData);

  // Atribuir role como custom claim
  await admin.auth().setCustomUserClaims(fbUser.uid, {
    role: userData.role
  });

  return userData;
}

async function listarUsers() {
  const snap = await collection.get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function obterUser(uid) {
  const doc = await collection.doc(uid).get();
  if (!doc.exists) return null;

  return { id: doc.id, ...doc.data() };
}

async function atualizarPerfil(uid, updates) {
  await collection.doc(uid).update(updates);

  // Se mudar role, atualizar claims do Firebase Auth
  if (updates.role) {
    await admin.auth().setCustomUserClaims(uid, { role: updates.role });
  }

  return obterUser(uid);
}

async function apagarUser(uid) {
  // Remover do Auth
  await admin.auth().deleteUser(uid);

  // Remover do Firestore
  await collection.doc(uid).delete();
}

module.exports = {
  criarUser,
  listarUsers,
  obterUser,
  atualizarPerfil,
  apagarUser
};
