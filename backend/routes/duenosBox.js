const express = require('express');
const router = express.Router();
const db = require('../db');

//  POST /api/duenos-box
router.post('/', (req, res) => {
  const { id_usuario, nombre_box } = req.body;

  if (!id_usuario || !nombre_box) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  db.query(
    'INSERT INTO duenos_box (id_usuario, nombre_box) VALUES (?, ?)',
    [id_usuario, nombre_box],
    (err, result) => {
      if (err) {
        console.error('❌ Error en duenos_box:', err);
        return res.status(500).send({ error: 'Error en la base de datos' });
      }
      
      res.status(201).json({ id_dueno: result.insertId });
    }
  );
});

module.exports = router;
