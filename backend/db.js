// 🛠️ backend/db.js

const mysql = require('mysql2/promise'); // 👈 AQUÍ la diferencia
require('dotenv').config();

// Creamos un Pool de conexiones (con soporte a Promesas)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
