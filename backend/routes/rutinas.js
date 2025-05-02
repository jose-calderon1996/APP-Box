const express = require('express');
const router = express.Router();
const db = require('../db'); // conexión a MySQL (pool)
const plantillasRutinas = require('./plantillasRutinas');

// ✅ Crear rutina y ejercicios desde plantilla
router.post('/crear-desde-plantilla', async (req, res) => {
  const { id_cliente, nombre_plantilla, dia_entrenamiento } = req.body;

  if (!id_cliente || !nombre_plantilla || !dia_entrenamiento) {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

  const ejerciciosPlantilla = plantillasRutinas[nombre_plantilla];

  if (!ejerciciosPlantilla) {
    return res.status(404).json({ error: 'Plantilla no encontrada' });
  }

  const fechaAsignada = new Date().toISOString().slice(0, 10);

  try {
    const [result] = await db.query(
      `INSERT INTO rutinas (id_cliente, nombre_rutina, fecha_asignada, dia_entrenamiento)
       VALUES (?, ?, ?, ?)`,
      [id_cliente, nombre_plantilla, fechaAsignada, dia_entrenamiento]
    );

    const idRutinaNueva = result.insertId;

    const insertEjercicioQuery = `
      INSERT INTO ejercicios_rutina (id_rutina, nombre_ejercicio, series, repeticiones)
      VALUES (?, ?, ?, ?)
    `;

    const inserts = ejerciciosPlantilla.map((ejercicio) =>
      db.query(insertEjercicioQuery, [
        idRutinaNueva,
        ejercicio.nombre_ejercicio,
        ejercicio.series,
        ejercicio.repeticiones,
      ])
    );

    await Promise.all(inserts);

    res.status(201).json({ message: '✅ Rutina y ejercicios creados exitosamente' });
  } catch (error) {
    console.error('❌ Error creando rutina y ejercicios:', error);
    res.status(500).json({ error: 'Error creando rutina o ejercicios' });
  }
});

// ✅ Obtener rutinas por cliente
router.get('/cliente/:id_cliente', async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const [result] = await db.query(
      `SELECT id_rutina, nombre_rutina, fecha_asignada, dia_entrenamiento
       FROM rutinas
       WHERE id_cliente = ?`,
      [id_cliente]
    );

    res.json(result);
  } catch (error) {
    console.error('❌ Error obteniendo rutinas:', error);
    res.status(500).json({ error: 'Error obteniendo rutinas' });
  }
});

// ✅ Obtener detalle de rutina
router.get('/detalle/:id_rutina', async (req, res) => {
  const { id_rutina } = req.params;

  try {
    const [resultRutina] = await db.query(
      `SELECT nombre_rutina, dia_entrenamiento FROM rutinas WHERE id_rutina = ?`,
      [id_rutina]
    );

    if (resultRutina.length === 0) {
      return res.status(404).json({ error: 'Rutina no encontrada' });
    }

    const rutina = resultRutina[0];

    const [resultEjercicios] = await db.query(
      `SELECT nombre_ejercicio, series, repeticiones
       FROM ejercicios_rutina
       WHERE id_rutina = ?`,
      [id_rutina]
    );

    res.json({
      nombre_rutina: rutina.nombre_rutina,
      dia_entrenamiento: rutina.dia_entrenamiento,
      ejercicios: resultEjercicios,
    });
  } catch (error) {
    console.error('❌ Error obteniendo detalle de rutina:', error);
    res.status(500).json({ error: 'Error obteniendo detalle de rutina' });
  }
});

// ✅ Registrar rutina realizada
router.post('/rutina-realizada', async (req, res) => {
  const { id_cliente, id_rutina } = req.body;

  if (!id_cliente || !id_rutina) {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

  const fechaRealizacion = new Date().toISOString().slice(0, 10);
  const completada = true;

  try {
    await db.query(
      `INSERT INTO rutina_realizada (id_cliente, id_rutina, fecha_realizacion, completada)
       VALUES (?, ?, ?, ?)`,
      [id_cliente, id_rutina, fechaRealizacion, completada]
    );

    res.status(201).json({ message: '✅ Rutina realizada registrada' });
  } catch (error) {
    console.error('❌ Error registrando rutina realizada:', error);
    res.status(500).json({ error: 'Error registrando rutina realizada' });
  }
});

// ✅ Agregar comentario a rutina
router.post('/comentarios/agregar', async (req, res) => {
  const { id_cliente, id_rutina, comentario } = req.body;

  if (!id_cliente || !id_rutina || !comentario) {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

  try {
    await db.query(
      `INSERT INTO comentarios_rutina (id_cliente, id_rutina, comentario)
       VALUES (?, ?, ?)`,
      [id_cliente, id_rutina, comentario]
    );

    res.status(201).json({ message: '✅ Comentario guardado correctamente' });
  } catch (error) {
    console.error('❌ Error insertando comentario:', error);
    res.status(500).json({ error: 'Error insertando comentario' });
  }
});

// ✅ Registrar ejercicio individual
router.post('/registro-ejercicios', async (req, res) => {
  const { id_cliente, nombre_ejercicio, peso, series_realizadas, repeticiones_realizadas, fecha } = req.body;

  if (!id_cliente || !nombre_ejercicio || peso == null || series_realizadas == null || repeticiones_realizadas == null || !fecha) {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

  try {
    await db.query(
      `INSERT INTO registro_ejercicio_cliente (id_cliente, nombre_ejercicio, peso, series_realizadas, repeticiones_realizadas, fecha_registro)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_cliente, nombre_ejercicio, peso, series_realizadas, repeticiones_realizadas, fecha]
    );

    res.status(201).json({ mensaje: '✅ Registro guardado correctamente' });
  } catch (error) {
    console.error('❌ Error guardando registro de ejercicio:', error);
    res.status(500).json({ error: 'Error al guardar registro de ejercicio' });
  }
});

module.exports = router;
