const db = require('../db');

const [result] = await db.query('SELECT * FROM usuarios WHERE ...');
