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
            showServerMessage(message, 'success');
              // Libro actualizado correctamente, puedes mostrar un mensaje de éxito o realizar otras acciones
              // Cerrar el modal de edición
              $("#editBookModal").modal("hide");
              // Recargar la lista de libros para reflejar los cambios
        const booksContainer = document.getElementById("books");
        booksContainer.innerHTML = "";
              loadBooks();
          })
          .catch((error) => showServerMessage(error, 'error'));
  });