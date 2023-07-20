const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// con app.post('/book', crearLibro()); estamos indicando que cuando se reciba una solicitud POST en la ruta /book, se ejecute la función de devolución de llamada que se pasa como segundo argumento. En este caso, la función de devolución de llamada recibe dos parámetros: req y res. req contiene los datos de la solicitud y res se utiliza para enviar una respuesta al cliente.
const crearLibro = require('./book-create.js');
app.post('/book', crearLibro());

//con app.get('/book', mostrarLibro()); al igual que antes ejecuta una funcion cuando reciba un request GET, en este caso es mostrar todos los libros.

const mostrarLibro = require('./book-getall.js');
app.get('/book', mostrarLibro());

//lo mismo para borrar y actualizar
const borrarLibro = require('./book-delete.js');
app.delete('/book/:isbn', borrarLibro());

const updateLibro = require('./book-update.js');
app.post('/book/:isbn', updateLibro());


// app.listen inicia el servidor y lo hace escuchar en el puerto especificado. En este caso, el servidor se iniciará en el puerto 3000. Cuando el servidor se inicia correctamente, se ejecuta la función de devolución de llamada que se pasa como segundo argumento.
app.listen(port, () => console.log(`API de libros escuchando en el puerto ${port}!`));

// En este ejemplo, hemos creado una conexión a la base de datos MySQL utilizando los detalles de configuración adecuados (asegúrate de reemplazar 'tuusuario' y 'tucontrasenia' con tus propias credenciales de MySQL).

// Luego, hemos modificado las rutas POST y GET para insertar y obtener los libros desde la base de datos MySQL utilizando consultas SQL. Las demás rutas y funcionalidades pueden permanecer como antes.

// Este es solo un ejemplo básico para que puedas comenzar. Para una aplicación más completa y segura, es recomendable utilizar consultas parametrizadas y validar los datos antes de enviarlos a la base de datos.

// Ten en cuenta que este ejemplo asume que ya has configurado tu servidor MySQL y tienes una tabla llamada "books" con la estructura adecuada en tu base de datos "bookstore". Asegúrate de adaptar el código según tu configuración y estructura de base de datos.