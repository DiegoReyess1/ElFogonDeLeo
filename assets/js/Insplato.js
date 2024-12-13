function mostrarVistaPrevia(event) {
  // Verifica si un archivo fue seleccionado
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();  // Crea un nuevo objeto FileReader

    reader.onload = function(e) {
      // Asigna el src de la imagen previa con el resultado de la lectura
      var output = document.getElementById('imagen-previa');
      output.src = e.target.result;

      // Muestra el contenedor de la imagen previa
      var container = document.getElementById('imagen-previa-container');
      container.style.display = 'block';  // Asegura que el marco esté visible

      // Muestra la imagen
      output.style.display = 'block';
    };

    reader.readAsDataURL(event.target.files[0]);  // Lee el archivo seleccionado como URL
  } else {
    // Si no se ha seleccionado una imagen, mantiene el contenedor visible con el marco
    var container = document.getElementById('imagen-previa-container');
    container.style.display = 'block';  // Asegura que el marco esté visible

    var output = document.getElementById('imagen-previa');
    output.style.display = 'none';  // Oculta la imagen si no hay selección
  }
}

function previewImage(event) {
  var reader = new FileReader();
  reader.onload = function () {
      var output = document.querySelector('.imagen-previa img'); // Selecciona la imagen dentro de .imagen-previa
      output.src = reader.result; // Actualiza el atributo src con la nueva imagen
  };
  reader.readAsDataURL(event.target.files[0]); // Lee el archivo seleccionado
}
