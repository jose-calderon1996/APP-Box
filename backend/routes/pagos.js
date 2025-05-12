// routes/pagos.js
const express = require('express');
const router = express.Router();
const webpay = require('../transbank'); // 👈 Esta es la instancia correcta

// ✅ Crear transacción
router.post('/crear-transaccion', async (req, res) => {
  const { monto } = req.body;

  const buyOrder = 'orden_' + Math.floor(Math.random() * 1000000);
  const sessionId = 'sesion_' + Math.floor(Math.random() * 1000000);
  const returnUrl = 'https://app-box-v10.onrender.com/pago-confirmado';



  try {
    const response = await webpay.create(buyOrder, sessionId, monto, returnUrl);

    res.json({
      url: response.url,     // URL del sandbox de Transbank
      token: response.token  // Token para redirección
    });
  } catch (error) {
    console.error('❌ Error al crear transacción:', error);
    res.status(500).json({ error: 'No se pudo crear la transacción' });
  }
});

// ✅ Confirmar transacción
router.post('/confirmar-transaccion', async (req, res) => {
  const { token_ws } = req.body;

  try {
    const result = await webpay.commit(token_ws);

    res.json({
      estado: result.response_code === 0 ? 'aprobado' : 'rechazado',
      result
    });
  } catch (error) {
    console.error('❌ Error al confirmar transacción:', error);
    res.status(500).json({ error: 'Error al confirmar el pago' });
  }
});


// 🔁 Redirecciona con token_ws a tu app Ionic
router.get('/redirigir-app', (req, res) => {
  const token = req.query.token_ws;

  // Redirige a la app móvil o vista web con el token
  res.redirect(`https://app-box-v10.web.app/pago-confirmado?token_ws=${token}`);
});


module.exports = router;
