const mysql = require('mysql2/promise');
require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env

const pool = mysql.createPool({
  host: process.env.DB_HOST,          // Dirección del servidor MySQL
  port: process.env.DB_PORT,          // Puerto de la base de datos
  user: process.env.DB_USER,          // Usuario MySQL
  password: process.env.DB_PASSWORD,  // Contraseña de MySQL
  database: process.env.DB_NAME,      // Nombre de la base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000               // Tiempo de espera para evitar un error de timeout
});

async function testConnection() {
  try {
    const [results] = await pool.query('SELECT 1');
    console.log('Conexión exitosa a la base de datos');
  } catch (err) {
    console.error('Error al conectar con la base de datos:', err);
  }
}

testConnection();
