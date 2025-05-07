const express = require('express');
const router = express.Router();
const admin = require('../firebase'); // Asegúrate de que esto esté bien importado

// Endpoint para probar el envío manual de notificaciones
router.post('/test', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, error: 'Token FCM requerido' });
  }

  const mensaje = {
    notification: {
      title: '🔔 Notificación de prueba',
      body: 'Esta es una prueba enviada desde el backend.'
    },
    token: token
  };

  try {
    console.log('📨 Enviando notificación de prueba a token:', token);

    const respuesta = await admin.messaging().send(mensaje);
    console.log('✅ Notificación enviada correctamente:', respuesta);

    res.json({
      success: true,
      message: 'Notificación de prueba enviada correctamente',
      firebaseResponse: respuesta
    });

  } catch (error) {
    console.error('❌ Error al enviar notificación de prueba:', error);

    res.status(500).json({
      success: false,
      message: 'Fallo al enviar notificación de prueba',
      error: error.message,
      detalle: error
    });
  }
});

module.exports = router;
/////