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
  console.log('🚀 Entró a /api/subir-foto-progreso'); // 👈 log clave

  const { id_cliente, peso } = req.body;
  const archivo = req.file;

  console.log('📥 Datos recibidos:', {
    id_cliente,
    peso,
    archivo: archivo?.originalname || 'archivo no recibido'
  });

  if (!id_cliente || !peso || !archivo) {
    console.warn('⚠️ Faltan datos en la solicitud');
    return res.status(400).json({ message: 'Faltan datos o imagen' });
  }

  const fecha = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  try {
    // Subir imagen a Cloudinary desde buffer
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

    console.log('📸 Subiendo imagen a Cloudinary...');
    const resultado = await subirACloudinary(archivo);
    const url_foto = resultado.secure_url;
    console.log('✅ Imagen subida con éxito:', url_foto);

    // 🔹 INSERT en progreso_cliente
    console.log('📝 Insertando en progreso_cliente con:', { id_cliente, peso, fecha });
    try {
      await db.query(`
        INSERT INTO progreso_cliente (id_cliente, peso, fecha)
        VALUES (?, ?, ?)
      `, [id_cliente, peso, fecha]);
      console.log('✅ Insert en progreso_cliente exitoso');
    } catch (error) {
      console.error('❌ Error al insertar en progreso_cliente:', error);
      return res.status(500).json({
        message: 'Error al insertar en progreso_cliente',
        error: error.message,
        stack: error.stack
      });
    }

    // 🔹 INSERT en fotos_progreso
    console.log('📝 Insertando en fotos_progreso con:', { id_cliente, peso, url_foto, fecha });
    try {
      await db.query(`
        INSERT INTO fotos_progreso (id_usuario_cliente, peso, url_foto, fecha)
        VALUES (?, ?, ?, ?)
      `, [id_cliente, peso, url_foto, fecha]);
      console.log('✅ Insert en fotos_progreso exitoso');
    } catch (error) {
      console.error('❌ Error al insertar en fotos_progreso:', error);
      return res.status(500).json({
        message: 'Error al insertar en fotos_progreso',
        error: error.message,
        stack: error.stack
      });
    }

    console.log('✅ Registro de progreso completado');
    res.status(201).json({ message: 'Foto subida y progreso registrado', url: url_foto });

  } catch (error) {
    console.error('❌ Error inesperado al subir progreso:', error);
    res.status(500).json({
      message: 'Error inesperado al subir progreso',
      error: error.message,
      stack: error.stack
    });
  }
});

module.exports = router;
