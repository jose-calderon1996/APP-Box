// Este archivo permite recibir notificaciones push en segundo plano desde Firebase
// Funciona solo en navegadores web como Chrome, Firefox, etc.

importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

// Inicializamos Firebase con la configuracion de tu proyecto
firebase.initializeApp({
  apiKey: "AIzaSyCbtKM-jp_XfIrCUzo5E-He8AfRTF_58HQ",
  authDomain: "mi-coach-personal.firebaseapp.com",
  projectId: "mi-coach-personal",
  storageBucket: "mi-coach-personal.appspot.com",
  messagingSenderId: "609170265888",
  appId: "1:609170265888:web:75c3309741f3c4f9e92945",
  measurementId: "G-JT4XJT0QZ0"
});

// Activamos el servicio de mensajeria
const messaging = firebase.messaging();
