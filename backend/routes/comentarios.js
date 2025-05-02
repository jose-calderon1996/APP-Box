const express = require('express');
const router = express.Router();
const db = require('../db'); // o '../config/db'

// ✅ GET - Mostrar todos los comentarios para el dueño
router.get('/comentarios-box', async (req, res) => {
  try {
    const [comentarios] = await db.query(`
      SELECT c.*, u.nombre AS nombre_cliente
      FROM comentarios_box c
      JOIN usuarios u ON c.id_usuario = u.id_usuario
      ORDER BY c.fecha DESC
    `);
    res.json(comentarios);
  } catch (error) {
    console.error('❌ Error al obtener comentarios:', error);
    res.status(500).json({ error: 'No se pudo obtener comentarios' });
  }
});

// ✅ POST - Guardar nuevo comentario desde el cliente
router.post('/comentarios-box', async (req, res) => {
  const { id_usuario, comentario, puntuacion } = req.body;

  try {
    await db.query(`
      INSERT INTO comentarios_box (id_usuario, comentario, puntuacion)
      VALUES (?, ?, ?)
    `, [id_usuario, comentario, puntuacion]);

    res.status(200).json({ mensaje: 'Comentario guardado correctamente' });
  } catch (error) {
    console.error('❌ Error al guardar comentario:', error);
    res.status(500).json({ error: 'No se pudo guardar el comentario' });
  }
});

module.exports = router;
