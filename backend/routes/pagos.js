// routes/pagos.js
const express = require('express');
const router = express.Router();
const WebpayPlus = require('../transbank');

// Crear transacción
router.post('/crear-transaccion', async (req, res) => {
  const { monto } = req.body;

  const buyOrder = 'orden_' + Math.floor(Math.random() * 1000000);
  const sessionId = 'sesion_' + Math.floor(Math.random() * 1000000);
  const returnUrl = 'http://localhost:8100/pago-confirmado'; // Ajusta según tu app

  try {
    const response = await WebpayPlus.Transaction.create(
      buyOrder,
      sessionId,
      monto,
      returnUrl
    );

    res.json({
      url: response.url,     // Página oficial de Transbank
      token: response.token  // Token único del pago
    });
  } catch (error) {
    console.error('Error al crear transacción:', error);
    res.status(500).json({ error: 'No se pudo crear la transacción' });
  }
});

// Confirmar transacción
router.post('/confirmar-transaccion', async (req, res) => {
  const { token_ws } = req.body;

  try {
    const result = await WebpayPlus.Transaction.commit(token_ws);
    res.json({ estado: result.response_code === 0 ? 'aprobado' : 'rechazado', result });
  } catch (error) {
    console.error('Error al confirmar transacción:', error);
    res.status(500).json({ error: 'Error al confirmar pago' });
  }
});

module.exports = router;
