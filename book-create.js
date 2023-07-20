const express = require('express');
const db = require('./db.js');


const crearLibro = express.Router();

module.exports = () => {
    crearLibro.post('/book', (req, res) => {

    const book = req.body;
  
    // Inserta el libro en la base de datos
    db.query('INSERT INTO books SET ?', book, (err, result) => {
      if (err) {
        console.error('Error al insertar el libro en la base de datos:', err);
        res.status(500).send('Error del servidor');
        return;
      }
  
      res.send('Libro agregado a la base de datos');
    });
});
return crearLibro;
}