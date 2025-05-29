
const express = require('express');
const router = express.Router();
const webpay = require('../transbank'); 

//  Crear transacción
router.post('/crear-transaccion', async (req, res) => {
  const { monto } = req.body;

  const buyOrder = 'orden_' + Math.floor(Math.random() * 1000000);
  const sessionId = 'sesion_' + Math.floor(Math.random() * 1000000);
  const returnUrl = 'http://localhost:8100/pago-confirmado'; 

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

//  Confirmar transacción
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

module.exports = router;
