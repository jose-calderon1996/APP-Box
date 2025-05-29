
const express = require('express');
const router = express.Router();
const db = require('../db');

// ruta para poder enviar un aviso del dueño
router.post('/crear-aviso-duenio', (req, res) => {
  const { id_dueno, titulo, mensaje, visible_para } = req.body;

  const query = 'INSERT INTO avisos_box (id_dueno, titulo, mensaje, visible_para) VALUES (?, ?, ?, ?)';
  const values = [id_dueno, titulo, mensaje, visible_para];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(' Error al insertar el aviso:', err);
      return res.status(500).json({ error: 'Error al insertar el aviso' });
    }

    res.json({ mensaje: ' Aviso creado correctamente' });
  });
});


module.exports = router;
