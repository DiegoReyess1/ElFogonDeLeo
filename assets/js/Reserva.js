function openModal(event) {
  event.preventDefault(); // Prevenir que el formulario se envíe inmediatamente

  // Obtener todos los campos del formulario
  var nombre = document.getElementById('name').value;
  var correo = document.getElementById('email').value;
  var telefono = document.getElementById('phone').value;
  var fecha = document.getElementById('date').value;
  var hora = document.getElementById('time').value;
  var personas = document.getElementById('people').value;

  // Validación: Verificar si todos los campos requeridos están llenos
  if (nombre === "" || correo === "" || telefono === "" || fecha === "" || hora === "" || personas === "") {
    alert("Por favor, completa todos los campos.");
    return; // Si algún campo está vacío, no abrir el modal
  }

  // Calcular el precio basado en el número de personas
  var precioPorPersona = 20000; 
  var precioSalon = personas * precioPorPersona;

  // Mostrar el precio calculado en el modal
  document.getElementById('modalPrecioSalon').innerText = precioSalon;

  // Mostrar el modal
  document.getElementById('reservationModal').style.display = "block";
}

function closeModal() {
  // Cerrar el modal
  document.getElementById('reservationModal').style.display = "none";
}

// Evitar el cierre del modal al hacer clic dentro del contenido del modal
document.querySelector('.modal-content').addEventListener('click', function(event) {
  event.stopPropagation(); // Esto evitará que el modal se cierre si el contenido es clickeado
});

