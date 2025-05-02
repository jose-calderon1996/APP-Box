const express = require('express');
const router = express.Router();
const db = require('../db');
const cloudinary = require('../cloudinary');

const multer = require('multer');
const streamifier = require('streamifier');

// Configurar multer para recibir archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🚀 SUBIR FOTO Y REGISTRAR PROGRESO (peso + foto en Cloudinary)
router.post('/api/subir-foto-progreso', upload.single('imagen'), async (req, res) => {
  const { id_cliente, peso } = req.body;
  const archivo = req.file;

  if (!id_cliente || !peso || !archivo) {
    return res.status(400).json({ message: 'Faltan datos o imagen' });
  }

  const fecha = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  try {
    // Subir a Cloudinary desde buffer
    const subirACloudinary = (archivo) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'progreso' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(archivo.buffer).pipe(stream);
      });
    };

    const resultado = await subirACloudinary(archivo);
    const url_foto = resultado.secure_url;

    // Insertar en progreso_cliente
    await db.query(`
      INSERT INTO progreso_cliente (id_cliente, peso, fecha)
      VALUES (?, ?, ?)
    `, [id_cliente, peso, fecha]);

    // Insertar en fotos_progreso
    await db.query(`
      INSERT INTO fotos_progreso (id_usuario_cliente, peso, url_foto, fecha)
      VALUES (?, ?, ?, ?)
    `, [id_cliente, peso, url_foto, fecha]);

    res.status(201).json({ message: 'Foto subida y progreso registrado', url: url_foto });

  } catch (error) {
    console.error('❌ Error al subir a Cloudinary:', error);
    res.status(500).json({ message: 'Error al subir progreso', error: error.message });
  }
});

// 🚀 VER HISTORIAL DE PROGRESO
router.get('/api/historial-progreso/:id_cliente', async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const [resultados] = await db.query(`
      SELECT 
          id_foto,
          url_foto,
          peso,
          fecha
      FROM 
          fotos_progreso
      WHERE 
          id_usuario_cliente = ?
      ORDER BY 
          fecha DESC
    `, [id_cliente]);

    res.json(resultados);
  } catch (error) {
    console.error('Error obteniendo historial de progreso:', error);
    res.status(500).json({ message: 'Error al obtener historial de progreso', error: error.message });
  }
});

// 🚀 OBTENER PESO INICIAL
router.get('/api/peso-inicial/:id_cliente', async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const [resultado] = await db.query(`
      SELECT peso, fecha 
      FROM progreso_cliente 
      WHERE id_cliente = ? 
      ORDER BY fecha ASC, id_progreso ASC 
      LIMIT 1
    `, [id_cliente]);

    if (resultado.length > 0) {
      res.json({ peso_inicial: resultado[0].peso, fecha: resultado[0].fecha });
    } else {
      res.status(404).json({ message: 'No se encontró registro inicial.' });
    }
  } catch (error) {
    console.error('Error trayendo peso inicial:', error);
    res.status(500).json({ message: 'Error trayendo peso inicial', error: error.message });
  }
});

// 🚀 OBTENER PESO ACTUAL
router.get('/api/peso-actual/:id_cliente', async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const [resultado] = await db.query(`
      SELECT peso, fecha 
      FROM progreso_cliente 
      WHERE id_cliente = ? 
      ORDER BY fecha DESC, id_progreso DESC 
      LIMIT 1
    `, [id_cliente]);

    if (resultado.length > 0) {
      res.json({ peso_actual: resultado[0].peso, fecha: resultado[0].fecha });
    } else {
      res.status(404).json({ message: 'No se encontró registro actual.' });
    }
  } catch (error) {
    console.error('Error trayendo peso actual:', error);
    res.status(500).json({ message: 'Error trayendo peso actual', error: error.message });
  }
});

module.exports = router;
