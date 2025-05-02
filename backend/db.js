// 📁 backend/db.js

const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

try {
  console.log('🔧 Intentando conectar a la base de datos con:');
  console.log({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: '********', // No muestres la contraseña real
    database: process.env.DB_NAME
  });

  pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // 🧪 Probar la conexión al iniciarse
  pool.getConnection()
    .then(conn => {
      console.log('✅ Conexión a la base de datos MySQL establecida correctamente');
      conn.release();
    })
    .catch(err => {
      console.error('❌ Error al probar la conexión con la base de datos:', err.message);
    });

} catch (error) {
  console.error('❌ Error al crear el pool de conexión:', error.message);
}

module.exports = pool;
