// Función para mostrar u ocultar el modal del carrito
function toggleCart() {
    document.getElementById('cartModal').classList.toggle('activo');
}

// Función para agregar un producto al carrito
function addToCart(nombre, precio, imagen, Id_Plato) {
    console.log('nombre:', nombre, 'precio:', precio, 'imagen:', imagen, 'Id_Plato:', Id_Plato); // Verifica los valores

    // Obtener los elementos del carrito de localStorage, si no existe se crea un arreglo vacío
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Verificar si los datos del producto están completos
    if (!nombre || !precio || !Id_Plato) {
        alert("Los datos del producto son incompletos.");
        return;
    }

    // Crear un objeto para el producto
    const item = {
        id_plato: Id_Plato,
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        cantidad: 1,
        subtotal: precio * 1
    };

    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cartItems.findIndex(item => item.id_plato === Id_Plato);
    if (existingItemIndex !== -1) {
        // Si el producto ya está en el carrito, actualizar su cantidad y subtotal
        cartItems[existingItemIndex].cantidad += 1;
        cartItems[existingItemIndex].subtotal = cartItems[existingItemIndex].precio * cartItems[existingItemIndex].cantidad;
    } else {
        // Si el producto no está en el carrito, agregarlo
        cartItems.push(item);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Actualizar la interfaz del carrito
    updateCartUI();
}

// Función para eliminar una unidad de un producto o el producto completo si la cantidad es 1
function eliminarItem(boton, precio, Id_Plato) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartTotal = document.getElementById('cartTotal');
    
    // Buscar el artículo en el carrito
    const item = cartItems.find(item => item.id_plato === Id_Plato);

    if (item) {
        // Si la cantidad es mayor a 1, solo reducimos la cantidad
        if (item.cantidad > 1) {
            item.cantidad -= 1;  // Reducir la cantidad
            item.subtotal = item.precio * item.cantidad;  // Recalcular el subtotal
        } else {
            // Si la cantidad es 1 o menos, eliminar el artículo del carrito
            cartItems.splice(cartItems.indexOf(item), 1);
        }

        // Actualizar el carrito en localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Recalcular el total
        let total = 0;
        cartItems.forEach(item => {
            total += item.subtotal;
        });

        // Actualizar el total en el DOM
        cartTotal.innerText = total.toFixed(2);

        // Recargar el carrito en la interfaz
        loadCart();
    }
}

// Función para actualizar la interfaz del carrito en el DOM
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const contadorCarrito = document.querySelector('.contador-carrito');

    // Obtener los datos del carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    let total = 0;
    
    // Limpiar el contenedor del carrito
    cartItems.innerHTML = '';

    // Agregar cada producto al carrito en el DOM
    cart.forEach(item => {
        total += item.subtotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrito';
        itemElement.innerHTML = `
            <div class="item-contenido">
                <img src="${item.imagen}" alt="${item.nombre}" class="imagen-carrito">
                <div class="item-detalles">
                    <p><strong>${item.nombre}</strong></p>
                    <p>Precio: $${item.precio.toFixed(2)}</p>
                    <p>Cantidad: ${item.cantidad}</p>
                </div>
            </div>
            <button class="btn-eliminar" onclick="eliminarItem(this, ${item.precio}, ${item.id_plato})">Eliminar</button>
        `;
        cartItems.appendChild(itemElement);
    });

    // Actualizar el total del carrito
    cartTotal.innerText = total.toFixed(2);

    // Actualizar el contador de productos en el carrito
    if (contadorCarrito) {
        contadorCarrito.innerText = cart.length;
    }
}

function finalizarCompra() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const total = parseFloat(document.getElementById('cartTotal').innerText);

    if (cartItems.length === 0) {
        alert("Tu carrito está vacío. No puedes finalizar la compra.");
        return;
    }

    // Capturar las observaciones del textarea
    const observaciones = document.getElementById('observacionesTextarea').value.trim(); // Suponiendo que el textarea tiene id="observacionesTextarea"

    // Verifica que cada producto tenga las observaciones si se requiere
    cartItems.forEach(item => {
        item.observaciones = observaciones || 'No hay observaciones'; // Si no hay texto, asigna "No hay observaciones"
    });

    fetch('procesar_compra.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems, total })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.status === 'success') {
            localStorage.removeItem('cartItems');
            updateCartUI();

            window.location.href = 'CLIENTE/PEDIDOS.PHP';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al procesar tu compra.');
    });
}


// Cargar el carrito desde localStorage al cargar la página
function loadCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const contadorCarrito = document.querySelector('.contador-carrito');

    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    let total = 0;
    cartItems.innerHTML = '';

    cart.forEach(item => {
        total += item.subtotal;
        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrito';
        itemElement.innerHTML = `
            <div class="item-contenido">
                <img src="${item.imagen}" alt="${item.nombre}" class="imagen-carrito">
                <div class="item-detalles">
                    <p><strong>${item.nombre}</strong></p>
                    <p>Precio: $${item.precio.toFixed(2)}</p>
                    <p>Cantidad: ${item.cantidad}</p>
                </div>
            </div>
            <button class="btn-eliminar" onclick="eliminarItem(this, ${item.precio}, ${item.id_plato})">Eliminar</button>
        `;
        cartItems.appendChild(itemElement);
    });

    cartTotal.innerText = total.toFixed(2);
    if (contadorCarrito) contadorCarrito.innerText = cart.length;
}

// Cargar el carrito al inicio
document.addEventListener('DOMContentLoaded', loadCart);
