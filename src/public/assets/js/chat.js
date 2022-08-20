const socket = io();
socket.on('mensajeAgragado', (data) => {
  let mensajes = '';
  data.map((msg) => {
    mensajes += `<li>
            <span class="email"> ${msg.email} (${msg.tipo})</span> 
            <time>[${msg.timestamp}]</time> 
            <span class="mensaje">${msg.mensaje}</span>
        </li>
      `;
  });
  const divMensajes = document.querySelector('.mensajes');
  divMensajes.innerHTML = mensajes;
  divMensajes.scrollTop = divMensajes.scrollHeight;
  document.querySelector('form#chat').reset();
});

socket.on('mensajeError', (data) => {
  console.log(data.error);
});

const addMessage = (e) => {
  const formElements = e.target.elements;
  const formData = {
    mensaje: formElements.mensaje.value,
  };

  socket.emit('mensajeEnviado', {
    formData,
  });
};

document.querySelector('form#chat').addEventListener('submit', (e) => {
  e.preventDefault();
  addMessage(e);
});
