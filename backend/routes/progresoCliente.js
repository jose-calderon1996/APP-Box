// ... (todo lo que ya tienes arriba sigue igual)

// 🚀 VER HISTORIAL DE PROGRESO
router.get('/api/historial-progreso/:id_cliente', async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const [resultados] = await db.query(`
      SELECT id_foto, url_foto, peso, fecha
      FROM fotos_progreso
      WHERE id_usuario_cliente = ?
      ORDER BY fecha DESC
    `, [id_cliente]);

    res.json(resultados);
  } catch (error) {
    console.error('❌ Error obteniendo historial de progreso:', error);
    res.status(500).json({ message: 'Error al obtener historial de progreso' });
  }
});

// 🚀 OBTENER PESO INICIAL
router.get('/api/peso-inicial/:id_cliente', async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const [resultado] = await db.query(`
      SELECT peso, fecha 
      FROM progreso_cliente 
      WHERE id_cliente = ? 
      ORDER BY fecha ASC, id_progreso ASC 
      LIMIT 1
    `, [id_cliente]);

    if (resultado.length > 0) {
      res.json({ peso_inicial: resultado[0].peso, fecha: resultado[0].fecha });
    } else {
      res.status(404).json({ message: 'No se encontró registro inicial.' });
    }
  } catch (error) {
    console.error('❌ Error trayendo peso inicial:', error);
    res.status(500).json({ message: 'Error trayendo peso inicial' });
  }
});

// 🚀 OBTENER PESO ACTUAL
router.get('/api/peso-actual/:id_cliente', async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const [resultado] = await db.query(`
      SELECT peso, fecha 
      FROM progreso_cliente 
      WHERE id_cliente = ? 
      ORDER BY fecha DESC, id_progreso DESC 
      LIMIT 1
    `, [id_cliente]);

    if (resultado.length > 0) {
      res.json({ peso_actual: resultado[0].peso, fecha: resultado[0].fecha });
    } else {
      res.status(404).json({ message: 'No se encontró registro actual.' });
    }
  } catch (error) {
    console.error('❌ Error trayendo peso actual:', error);
    res.status(500).json({ message: 'Error trayendo peso actual' });
  }
});

module.exports = router;
