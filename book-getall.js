const express = require('express');
const db = require('./db.js');

const mostrarLibros = express.Router();
module.exports = () => {
    mostrarLibros.get('/book', (req, res) => {
    // Obtiene todos los libros de la base de datos
    db.query('SELECT * FROM books', (err, results) => {
      if (err) {
        console.error('Error al obtener los libros de la base de datos:', err);
        res.status(500).send('Error del servidor');
        return;
      }
  
      res.json(results);
    });
});
return mostrarLibros;
}