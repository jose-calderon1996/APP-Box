const express = require('express');
const router = express.Router();
const db = require('../db');

//  Ruta para insertar usuarios (dueño, entrenador, cliente)
router.post('/', async (req, res) => {
  const { uid_firebase, nombre, correo, tipo_usuario } = req.body;

  if (!uid_firebase || !nombre || !correo || !tipo_usuario) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO usuarios (uid_firebase, nombre, correo, tipo_usuario) VALUES (?, ?, ?, ?)',
      [uid_firebase, nombre, correo, tipo_usuario]
    );

    res.status(201).send({ id_usuario: result.insertId });
  } catch (err) {
    console.error(' Error al insertar usuario:', err);
    res.status(500).send({ error: 'Error al insertar usuario', detalle: err });
  }
});

//  Ruta para obtener usuario por UID de Firebase
router.get('/uid/:uid', async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    return res.status(400).json({ error: 'UID es necesario' });
  }

  try {
    const [results] = await db.query('SELECT * FROM usuarios WHERE uid_firebase = ?', [uid]);

    console.log('🔍 Resultado de búsqueda por UID:', results);

    if (results.length === 0) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }

    res.send(results[0]);
  } catch (err) {
    console.error(' Error en consulta UID:', err);
    res.status(500).send({ error: 'Error interno al buscar usuario' });
  }
});

//  Ruta para registrar cliente y asociarlo a un entrenador
router.post('/registrar-cliente', async (req, res) => {
  const { uid_firebase, nombre, correo, id_entrenador } = req.body;

  if (!uid_firebase || !nombre || !correo || !id_entrenador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const [resultCliente] = await db.query(
      'INSERT INTO usuarios (uid_firebase, nombre, correo, tipo_usuario) VALUES (?, ?, ?, ?)',
      [uid_firebase, nombre, correo, 'cliente']
    );

    const id_cliente = resultCliente.insertId;

    await db.query(
      'INSERT INTO entrenadores_clientes (id_entrenador, id_cliente) VALUES (?, ?)',
      [id_entrenador, id_cliente]
    );

    res.status(201).json({
      mensaje: 'Cliente creado y asociado correctamente',
      id_cliente
    });

  } catch (err) {
    console.error(' Error al registrar cliente:', err);
    res.status(500).json({ error: 'Error interno al registrar cliente', detalle: err });
  }
});

//  Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error(' Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

module.exports = router;
