// hace aparecer el modal para editar los libros
const setEditModal = (isbn, title) => {
  // Obtiene los elementos del modal que necesitamos actualizar
	const modalTitle = document.querySelector("#editBookModal .modal-title");
	const isbnInput = document.querySelector("#editBookModal #editIsbn");
	const titleInput = document.querySelector("#editBookModal #editTitle");
	// Agrega otros campos del formulario según sea necesario

  // Actualiza los valores de los elementos del modal
	modalTitle.textContent = "Edit Book: " + isbn + " - " + title;
	isbnInput.value = isbn;
  titleInput.value = title;
  // muestra el modal
  $('#editBookModal').modal('show');
};

// logica para el formulario de editar libros
const editForm = document.getElementById("editForm");

editForm.addEventListener("submit", (event) => {
	event.preventDefault();

  // Obtiene los valores de los campos del formulario
	const isbnInput = document.getElementById("editIsbn");
	const titleInput = document.getElementById("editTitle");
	// Agrega otros campos del formulario según sea necesario

    // Crea el objeto libro con los datos actualizados
	const updatedBook = {
		isbn: isbnInput.value,
		title: titleInput.value,
		// Asigna otros valores de los campos del formulario a las propiedades correspondientes del libro actualizado
	};

	fetch(`http://localhost:3000/book/${updatedBook.isbn}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedBook),
	})
		.then((response) => response.text())
		.then((message) => {
			console.log(message);
			// Libro actualizado correctamente, puedes mostrar un mensaje de éxito o realizar otras acciones
			// Cerrar el modal de edición
			$("#editBookModal").modal("hide");
			// Recargar la lista de libros para reflejar los cambios
      const booksContainer = document.getElementById("books");
      booksContainer.innerHTML = "";
			loadBooks();
		})
		.catch((error) => console.error(error));
});

// logica para el formulario de eliminar libros
const deleteBook = (isbn) => {
	// Implementa la funcionalidad para eliminar un libro
	fetch(`http://localhost:3000/book/${isbn}`, {
		method: "DELETE",
	})
		.then((response) => response.text())
		.then((message) => {
			console.log(message);
			// Libro eliminado correctamente, puedes mostrar un mensaje de éxito o realizar otras acciones
			// Elimina el libro de la interfaz de usuario
			const bookElement = document.querySelector(
				`#books [data-isbn="${isbn}"]`
			);
			bookElement.parentNode.removeChild(bookElement);
		})
		.catch((error) => console.error(error));
};

// logica para cargar todos los libros de la DB
const loadBooks = () => {
	fetch("http://localhost:3000/book")
		.then((response) => response.json())
		.then((books) => {
			const booksContainer = document.getElementById("books");
      booksContainer.innerHTML = "";
			books.forEach((book) => {
				const card = document.createElement("div");
				card.classList.add("card");
				card.dataset.isbn = book.isbn;

				const cardBody = document.createElement("div");
				cardBody.classList.add("card-body");

				const title = document.createElement("h5");
				title.classList.add("card-title");
				title.textContent = book.title;

				const isbn = document.createElement("h6");
				isbn.classList.add("card-subtitle", "mb-2", "text-muted");
				isbn.textContent = book.isbn;

				const deleteButton = document.createElement("button");
				deleteButton.classList.add("btn", "btn-danger");
				deleteButton.textContent = "Delete";
				deleteButton.addEventListener("click", () => deleteBook(book.isbn));

				const editButton = document.createElement("button");
				editButton.classList.add("btn", "btn-primary");
				editButton.setAttribute("data-toggle", "modal");
				editButton.setAttribute("data-target", "#editBookModal");
				editButton.textContent = "Edit";
				editButton.addEventListener("click", () => setEditModal(book.isbn, book.title));

				cardBody.appendChild(title);
				cardBody.appendChild(isbn);
				cardBody.appendChild(document.createElement("hr"));
				cardBody.appendChild(deleteButton);
				cardBody.appendChild(editButton);

				card.appendChild(cardBody);
				booksContainer.appendChild(card);
			});
		})
		.catch((error) => console.error(error));
};

//logica para agregar un libro a la db
const addBookForm = document.getElementById("addBookForm");

addBookForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const isbnInput = document.getElementById("isbn");
	const titleInput = document.getElementById("title");
	// Add other form fields as needed

	const book = {
		isbn: isbnInput.value,
		title: titleInput.value,
		// Assign other form field values to respective book properties
	};

	fetch("http://localhost:3000/book", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(book),
	})
		.then((response) => response.text())
		.then((message) => {
			console.log(message);
			// Book added successfully, you can display a success message or perform any other actions
			// Clear the form fields
			isbnInput.value = "";
			titleInput.value = "";
			// Clear other form fields as needed
      const booksContainer = document.getElementById("books");
      booksContainer.innerHTML = "";
			loadBooks(); // Reload the books to reflect the newly added book
		})
		.catch((error) => console.error(error));
});

// Carga la lista de libros al cargar la página
loadBooks();
