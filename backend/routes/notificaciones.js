const express = require('express');
const router = express.Router();
const { enviarNotificacion } = require('../services/onesignal.service');

// POST /api/notificaciones
router.post('/', async (req, res) => {
  const { titulo, mensaje, playerIds } = req.body;

  if (!titulo || !mensaje || !playerIds?.length) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  try {
    const resultado = await enviarNotificacion({ titulo, mensaje, playerIds });
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: 'Error al enviar notificación' });
  }
});

module.exports = router;
