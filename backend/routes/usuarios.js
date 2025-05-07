// 📁 backend/routes/usuarios.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// 📥 Ruta para insertar usuarios (dueño, entrenador, cliente)
router.post('/', async (req, res) => {
  const { uid_firebase, nombre, correo, tipo_usuario } = req.body;

  // Validar que todos los campos estén presentes
  if (!uid_firebase || !nombre || !correo || !tipo_usuario) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    // Insertar los datos del usuario en la base de datos
    const [result] = await db.query(
      'INSERT INTO usuarios (uid_firebase, nombre, correo, tipo_usuario) VALUES (?, ?, ?, ?)',
      [uid_firebase, nombre, correo, tipo_usuario]
    );

    res.status(201).send({ id_usuario: result.insertId });
  } catch (err) {
    console.error('❌ Error al insertar usuario:', err);
    res.status(500).send({ error: 'Error al insertar usuario', detalle: err });
  }
});

// 🔎 Ruta para obtener usuario por UID de Firebase
router.get('/uid/:uid', async (req, res) => {
  const { uid } = req.params;

  // Validar si el UID está presente
  if (!uid) {
    return res.status(400).json({ error: 'UID es necesario' });
  }

  try {
    // Consultar en la base de datos por el uid_firebase
    const [results] = await db.query('SELECT * FROM usuarios WHERE uid_firebase = ?', [uid]);

    if (results.length === 0) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }

    // Si el usuario se encuentra, devolver los datos
    res.send(results[0]);
  } catch (err) {
    console.error('❌ Error en consulta UID:', err);
    res.status(500).send({ error: 'Error interno al buscar usuario' });
  }
});

// 🧩 Ruta para registrar cliente y asociarlo a un entrenador
router.post('/registrar-cliente', async (req, res) => {
  const { uid_firebase, nombre, correo, id_entrenador } = req.body;

  // Validar que todos los datos sean correctos
  if (!uid_firebase || !nombre || !correo || !id_entrenador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    // 1. Insertar cliente
    const [resultCliente] = await db.query(
      'INSERT INTO usuarios (uid_firebase, nombre, correo, tipo_usuario) VALUES (?, ?, ?, ?)',
      [uid_firebase, nombre, correo, 'cliente']
    );

    const id_cliente = resultCliente.insertId;

    // 2. Asociar cliente con entrenador
    await db.query(
      'INSERT INTO entrenadores_clientes (id_entrenador, id_cliente) VALUES (?, ?)',
      [id_entrenador, id_cliente]
    );

    res.status(201).json({
      mensaje: 'Cliente creado y asociado correctamente',
      id_cliente
    });

  } catch (err) {
    console.error('❌ Error al registrar cliente:', err);
    res.status(500).json({ error: 'Error interno al registrar cliente', detalle: err });
  }
});

module.exports = router;
