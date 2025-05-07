// 📦 Módulos necesarios
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Carga variables de entorno
const app = express();

// 📡 Conexión a la base de datos
const db = require('./db');

// 📁 Rutas
const usuariosRoutes = require('./routes/usuarios');
const duenosBoxRoutes = require('./routes/duenosBox');
const entrenadorClientesRoutes = require('./routes/entrenadorClientes');
const logAccesoRoutes = require('./routes/logAcceso');
const rutinasRoutes = require('./routes/rutinas');
const progresoClienteRoutes = require('./routes/progresoCliente');
const resumenRoutes = require('./routes/resumen');
const comentariosRoutes = require('./routes/comentarios');
const testDbRoutes = require('./routes/test-db');


// 🛡️ Middlewares
app.use(cors());
app.use(express.json());

// 🌐 Rutas de la API
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/duenos-box', duenosBoxRoutes);
app.use('/api/entrenador-clientes', entrenadorClientesRoutes);
app.use('/api/log-acceso', logAccesoRoutes);
app.use('/api/rutinas', rutinasRoutes);
app.use(progresoClienteRoutes);         // sin prefijo si ya lo tiene interno
app.use('/api', resumenRoutes);
app.use('/api', comentariosRoutes);
app.use('/api', testDbRoutes);


// 🛠️ Ruta base para prueba
app.get('/', (req, res) => {
  res.send('✅ API funcionando correctamente desde Render!');
});

// 🚀 Iniciar servidor (Render requiere process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
///