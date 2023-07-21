// logica para el formulario de eliminar libros
const deleteBook = (isbn) => {
	// Implementa la funcionalidad para eliminar un libro
	fetch(`http://localhost:3000/book/${isbn}`, {
		method: "DELETE",
	})
		.then((response) => response.text())
		.then((message) => {
			showServerMessage(message, 'success');
			// Libro eliminado correctamente, puedes mostrar un mensaje de éxito o realizar otras acciones
			// Elimina el libro de la interfaz de usuario
			const bookElement = document.querySelector(
				`#books [data-isbn="${isbn}"]`
			);
			bookElement.parentNode.removeChild(bookElement);
		})
		.catch((error) => showServerMessage(error, 'error'));
};