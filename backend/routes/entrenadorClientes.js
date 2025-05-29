const express = require('express');
const router = express.Router();
const db = require('../db');

//  Ruta para contar clientes asociados
router.get('/contar-clientes/:id_entrenador', async (req, res) => {
  const { id_entrenador } = req.params;

  try {
    const [rows] = await db.query(`
      SELECT COUNT(*) AS total
      FROM entrenadores_clientes
      WHERE id_entrenador = ?
    `, [id_entrenador]);

    console.log('🔢 Total de clientes encontrados:', rows[0]);
    res.json(rows[0]);
  } catch (err) {
    console.error('❌ Error contando clientes:', err);
    res.status(500).json({ error: 'Error contando clientes' });
  }
});

//  Ruta para obtener clientes asociados
router.get('/clientes-asociados/:id_entrenador', async (req, res) => {
  const { id_entrenador } = req.params;

  try {
    const [rows] = await db.query(`
      SELECT u.id_usuario AS id_cliente, u.nombre, u.correo
      FROM entrenadores_clientes ec
      JOIN usuarios u ON ec.id_cliente = u.id_usuario
      WHERE ec.id_entrenador = ?
    `, [id_entrenador]);

    console.log(' Clientes asociados enviados al frontend:', rows);
    res.json(rows);
  } catch (err) {
    console.error('❌ Error obteniendo clientes asociados:', err);
    res.status(500).json({ error: 'Error obteniendo clientes asociados' });
  }
});

module.exports = router;
