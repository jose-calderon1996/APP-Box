const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta para registrar login
router.post('/registrar', (req, res) => {
  const { id_usuario } = req.body;
  console.log('📥 Insertando en log_accesos (login) con id_usuario:', id_usuario);

  const query = 'INSERT INTO log_accesos (id_usuario, fecha_hora, tipo_acceso) VALUES (?, NOW(), ?)';

  db.query(query, [id_usuario, 'login'], (err, result) => {
    if (err) {
      console.error('❌ Error registrando login:', err);
      return res.status(500).json({ error: 'Error registrando login' });
    }

    res.json({ message: '✅ Login registrado correctamente' });
  });
});

// Ruta para registrar logout
router.post('/registrar-logout', (req, res) => {
  const { id_usuario } = req.body;
  console.log('📥 Insertando en log_accesos (logout) con id_usuario:', id_usuario);

  const query = 'INSERT INTO log_accesos (id_usuario, fecha_hora, tipo_acceso) VALUES (?, NOW(), ?)';

  db.query(query, [id_usuario, 'logout'], (err, result) => {
    if (err) {
      console.error('❌ Error registrando logout:', err);
      return res.status(500).json({ error: 'Error registrando logout' });
    }

    res.json({ message: '✅ Logout registrado correctamente' });
  });
});

module.exports = router;
