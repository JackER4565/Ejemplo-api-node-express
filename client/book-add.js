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
			showServerMessage(message, 'success');
			// Book added successfully, you can display a success message or perform any other actions
			// Clear the form fields
			isbnInput.value = "";
			titleInput.value = "";
			// Clear other form fields as needed
      const booksContainer = document.getElementById("books");
      booksContainer.innerHTML = "";
			loadBooks(); // Reload the books to reflect the newly added book
		})
		.catch((error) => showServerMessage(error, 'error'));
});