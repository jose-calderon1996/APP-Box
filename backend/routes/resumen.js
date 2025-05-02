const express = require('express');
const router = express.Router();
const db = require('../db'); // ← asegúrate que esta conexión funciona correctamente

// GET /api/resumen-dueno
router.get('/resumen-dueno', async (req, res) => {
  try {
    // Contar entrenadores en la tabla usuarios
    const [entrenadores] = await db.query(
      "SELECT COUNT(*) AS total FROM usuarios WHERE tipo_usuario = 'entrenador'"
    );

    // Contar clientes en la tabla usuarios
    const [clientes] = await db.query(
      "SELECT COUNT(*) AS total FROM usuarios WHERE tipo_usuario = 'cliente'"
    );

    res.json({
      totalEntrenadores: entrenadores[0].total,
      totalClientes: clientes[0].total
    });

  } catch (error) {
    console.error('❌ Error en /resumen-dueno:', error);
    res.status(500).json({ error: 'Error al obtener resumen del panel del dueño' });
  }
});

module.exports = router;
