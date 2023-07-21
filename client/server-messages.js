// Función para mostrar mensajes del servidor
const showServerMessage = (message, type) => {
    const serverMessageElement = document.getElementById('serverMessage');
    
    serverMessageElement.textContent = message;
    serverMessageElement.innerHTML = serverMessageElement.innerHTML + `<button type="button" class="close bg-transparent" data-dismiss="alert" aria-hidden="true" onclick="hideServerMessage()">&times;</button>`;

    if (type === 'success') {
      serverMessageElement.className = 'alert alert-success';
    } else if (type === 'error') {
      serverMessageElement.className = 'alert alert-error';
    }
  
    serverMessageElement.style.display = 'block';
  };
  
  // Función para ocultar el mensaje del servidor
  const hideServerMessage = () => {
    const serverMessageElement = document.getElementById('serverMessage');
    serverMessageElement.style.display = 'none';
  };