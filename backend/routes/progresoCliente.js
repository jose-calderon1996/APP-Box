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

  // Mostrar datos recibidos
  console.log('📥 Datos recibidos:', {
    id_cliente,
    peso,
    archivo: archivo?.originalname || 'archivo no recibido'
  });

  // Validación básica
  if (!id_cliente || !peso || !archivo) {
    console.warn('⚠️ Faltan datos en la solicitud');
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

    console.log('📸 Subiendo imagen a Cloudinary...');
    const resultado = await subirACloudinary(archivo);
    const url_foto = resultado.secure_url;
    console.log('✅ Imagen subida con éxito:', url_foto);

    // Insertar en progreso_cliente
    console.log('📝 Insertando en progreso_cliente con:', { id_cliente, peso, fecha });
    await db.query(`
      INSERT INTO progreso_cliente (id_cliente, peso, fecha)
      VALUES (?, ?, ?)
    `, [id_cliente, peso, fecha]);

    // Insertar en fotos_progreso
    console.log('📝 Insertando en fotos_progreso con:', { id_cliente, peso, url_foto, fecha });
    await db.query(`
      INSERT INTO fotos_progreso (id_usuario_cliente, peso, url_foto, fecha)
      VALUES (?, ?, ?, ?)
    `, [id_cliente, peso, url_foto, fecha]);

    console.log('✅ Registro de progreso completado');
    res.status(201).json({ message: 'Foto subida y progreso registrado', url: url_foto });

  } catch (error) {
    console.error('❌ Error completo al subir progreso:', error);
    res.status(500).json({
      message: 'Error al subir progreso',
      error: error.message,
      stack: error.stack,
      detalle: error
    });
  }
});

module.exports = router;
