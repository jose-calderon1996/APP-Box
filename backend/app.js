const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// 📦 Conexión a la base de datos
const db = require('./db');

// ✅ Rutas importadas
const usuariosRoutes = require('./routes/usuarios');
const duenosBoxRoutes = require('./routes/duenosBox');
const entrenadorClientesRoutes = require('./routes/entrenadorClientes');
const logAccesoRoutes = require('./routes/logAcceso')
const rutinasRoutes = require('./routes/rutinas');
const progresoClienteRoutes = require('./routes/progresoCliente'); // Ajusta la ruta si es diferente
const resumenRoutes = require('./routes/resumen'); // apra mostrar en el panel de dueño 
const comentariosRoutes = require('./routes/comentarios');




// 🛡️ Middlewares necesarios
app.use(cors());
app.use(express.json());

// 🌐 Rutas API
app.use('/api/usuarios', usuariosRoutes); // Ruta para usuarios
app.use('/api/duenos-box', duenosBoxRoutes); // Ruta para dueños
app.use('/api/entrenador-clientes', entrenadorClientesRoutes); // Ruta para relaciones entrenador-clientes
app.use('/api/log-acceso', logAccesoRoutes);
app.use('/api/rutinas', rutinasRoutes);
app.use(progresoClienteRoutes);
app.use('/api', resumenRoutes);
app.use('/api', comentariosRoutes);


// 🚀 Iniciar el servidor
app.listen(3000, () => {
  console.log('🚀 Servidor corriendo en http://localhost:3000');
});
