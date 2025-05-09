const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

// Cargar las variables desde el archivo .env
dotenv.config();

// Verificamos que las variables se estén leyendo correctamente
console.log('🔍 CLOUD_NAME:', process.env.CLOUD_NAME);
console.log('🔍 API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log('🔍 API_SECRET:', process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
