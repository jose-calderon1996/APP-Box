// Ruta para enviar notificaciones push y guardarlas en la base de datos

const express = require('express');
const router = express.Router();
const admin = require('../firebase'); // Firebase inicializado
const db = require('../db'); // Conexion a MySQL

// POST /api/notificaciones/enviar
router.post('/enviar', async (req, res) => {
  const { id_usuario, token, titulo, cuerpo, tipo } = req.body;

  const mensaje = {
    notification: {
      title: titulo,
      body: cuerpo
    },
    token: token
  };

  try {
    // Enviamos la notificacion push a Firebase
    await admin.messaging().send(mensaje);

    // Guardamos la notificacion en MySQL
    await db.query(
      'INSERT INTO notificaciones (id_destinatario, titulo, tipo, mensaje, fecha_envio, leida) VALUES (?, ?, ?, ?, NOW(), 0)',
      [id_usuario, titulo, tipo, cuerpo]
    );

    res.json({ success: true, message: 'Notificacion enviada y guardada' });
  } catch (error) {
    console.error('Error al enviar o guardar notificacion:', error);
    res.status(500).json({ success: false, error });
  }
});

module.exports = router;
