
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
		.catch((error) => showServerMessage(error, 'error'));
};

// Carga la lista de libros al cargar la página
loadBooks();
