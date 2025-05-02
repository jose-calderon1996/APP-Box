// 📁 backend/db.js

const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

(async () => {
  try {
    console.log('🔧 Conectando con MYSQL_URL:', process.env.MYSQL_URL);

    // Crear pool usando la URL completa
    pool = await mysql.createPool(process.env.MYSQL_URL);

    // Probar la conexión
    const conn = await pool.getConnection();
    console.log('✅ Conectado exitosamente a MySQL');
    conn.release();
  } catch (error) {
    console.error('❌ Error al conectar con MySQL:', error.message);
  }
})();

module.exports = pool;
