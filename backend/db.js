// 📦 Módulo para conexión con MySQL
const mysql = require('mysql2/promise');
require('dotenv').config(); // Cargar variables de entorno desde .env

// 🛠️ Crear un pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST,          // Ej: containers-us-west-45.railway.app
  port: process.env.DB_PORT,          // Ej: 43179
  user: process.env.DB_USER,          // Ej: root
  password: process.env.DB_PASSWORD,  // Tu contraseña de Railway
  database: process.env.DB_NAME,      // Nombre de la base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000               // ⏱ 10 segundos para evitar ETIMEDOUT
});

// 🚀 Exportar el pool para usarlo en otros archivos
module.exports = pool;
