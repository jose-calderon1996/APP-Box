const admin = require('firebase-admin');

// Obtenemos el JSON completo desde la variable de entorno
const serviceAccount = JSON.parse(process.env.FIREBASE_KEY_JSON.replace(/\\n/g, '\n'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
