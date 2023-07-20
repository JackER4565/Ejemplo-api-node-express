const express = require('express');
const db = require('./db.js');

const borrarLibro = express.Router();
// export default (): express.Router => {
module.exports = () => {
    // export default () => {
    borrarLibro.delete("/book/:isbn", (req, res) => {


        // Obtenemos el ISBN desde la URL
        const isbn = req.params.isbn;

        // Eliminamos el libro de la base de datos
        db.query('DELETE FROM books WHERE isbn = ?', isbn, (err, result) => {
            if (err) {
                console.error('Error al eliminar el libro de la base de datos:', err);
                res.status(500).send('Error del servidor');
                return;
            }

            if (result.affectedRows === 0) {
                res.status(404).send('Libro no encontrado');
                return;
            }

            res.send('Libro eliminado de la base de datos');
        });
        
    });
    return borrarLibro;
}