const express = require('express');
const db = require('./db.js');

const updateLibro = express.Router();

module.exports = () => {
    updateLibro.post('/book/:isbn', (req, res) => {
    // Obtenemos el ISBN desde la URL
    const isbn = req.params.isbn;
    const updatedBook = req.body;
  
    // Actualizamos el libro en la base de datos
    db.query('UPDATE books SET ? WHERE isbn = ?', [updatedBook, isbn], (err, result) => {
      if (err) {
        console.error('Error al actualizar el libro en la base de datos:', err);
        res.status(500).send('Error del servidor');
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).send('Libro no encontrado');
        return;
      }
  
      res.send('Libro actualizado en la base de datos');
    });
});
return updateLibro;
}