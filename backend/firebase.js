// Este archivo inicializa Firebase Admin SDK para enviar notificaciones push

const admin = require('firebase-admin');

// Archivo JSON de credenciales descargado desde Firebase Console
const serviceAccount = require('./firebase-key.json');

// Inicializamos Firebase con las credenciales del servidor
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
