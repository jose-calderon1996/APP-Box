const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json'); // ← Carga directa desde el archivo

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
