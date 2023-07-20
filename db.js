const mysql = require('mysql');

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'db4free.net',
  user: 'tuusuario',
  password: 'tucontrasenia',
  database: 'bookstoredos',
});

// Conecta a la base de datos MySQL
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = db;