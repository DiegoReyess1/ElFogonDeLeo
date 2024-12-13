const RegistrateButton = document.getElementById('Registrate');
const IniciarSesionButton = document.getElementById('IniciarSesion');
const container = document.getElementById('container');

RegistrateButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

IniciarSesionButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
