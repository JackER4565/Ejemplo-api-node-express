const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// con app.post('/book', (req, res) => { ... } estamos indicando que cuando se reciba una solicitud POST en la ruta /book, se ejecute la función de devolución de llamada que se pasa como segundo argumento. En este caso, la función de devolución de llamada recibe dos parámetros: req y res. req contiene los datos de la solicitud y res se utiliza para enviar una respuesta al cliente.
app.post('/book', (req, res) => {
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

// con app.get('/book', (req, res) => { ... } estamos indicando que cuando se reciba una solicitud GET en la ruta /book, se ejecute la función de devolución de llamada que se pasa como segundo argumento. En este caso, la función de devolución de llamada recibe dos parámetros: req y res. req contiene los datos de la solicitud y res se utiliza para enviar una respuesta al cliente.

// entonces uso post cuando llamo a la base de datos y get cuando obtengo datos de la base de datos
app.get('/book', (req, res) => {
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

app.post('/book/:isbn', (req, res) => {
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

app.delete('/book/:isbn', (req, res) => {
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
// Resto del código...
// app.listen inicia el servidor y lo hace escuchar en el puerto especificado. En este caso, el servidor se iniciará en el puerto 3000. Cuando el servidor se inicia correctamente, se ejecuta la función de devolución de llamada que se pasa como segundo argumento.
app.listen(port, () => console.log(`API de libros escuchando en el puerto ${port}!`));

// En este ejemplo, hemos creado una conexión a la base de datos MySQL utilizando los detalles de configuración adecuados (asegúrate de reemplazar 'tu_usuario' y 'tu_contraseña' con tus propias credenciales de MySQL).

// Luego, hemos modificado las rutas POST y GET para insertar y obtener los libros desde la base de datos MySQL utilizando consultas SQL. Las demás rutas y funcionalidades pueden permanecer como antes.

// Este es solo un ejemplo básico para que puedas comenzar. Para una aplicación más completa y segura, es recomendable utilizar consultas parametrizadas y validar los datos antes de enviarlos a la base de datos.

// Ten en cuenta que este ejemplo asume que ya has configurado tu servidor MySQL y tienes una tabla llamada "books" con la estructura adecuada en tu base de datos "bookstore". Asegúrate de adaptar el código según tu configuración y estructura de base de datos.