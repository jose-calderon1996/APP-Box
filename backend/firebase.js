const admin = require('firebase-admin');

if (!process.env.FIREBASE_KEY_JSON) {
  throw new Error('🔥 La variable FIREBASE_KEY_JSON no está definida');
}

const serviceAccount = JSON.parse(
  process.env.FIREBASE_KEY_JSON.replace(/\\n/g, '\n')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
