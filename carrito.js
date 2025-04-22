document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();  // Llamada para cargar productos desde el archivo JSON
  mostrarCarrito();
  actualizarCarritoNavbar();
});

let productos = [];  // Variable global para los productos

function cargarProductos() {
  fetch('productos.json')  // Productos
    .then(response => response.json())
    .then(data => {
      productos = data;  // Asignamos los productos cargados a la variable global
      mostrarCarrito();  // MOstramos el carrito
      mostrarPrecioTotal();  // Mostramos el precio total después de cargar los productos
    })
    .catch(error => console.error("Error al cargar el archivo productos.json:", error));
}

function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedor = document.getElementById("contenedor-carrito");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  carrito.forEach(item => {
    const producto = productos.find(p => p.id === item.id);
    if (producto) {
      const card = document.createElement("div");
      card.classList.add("producto-carrito");
      card.innerHTML = `
        <img src="${producto.images[0]}" alt="${producto.nombre}" width="100">
        <div>
          <h3>${producto.nombre}</h3>
          <p>${producto.precio}</p>
          <p>Cantidad: ${item.cantidad}</p>
        </div>
      `;
      contenedor.appendChild(card);
    }
  });
}

function actualizarCarritoNavbar() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = totalCantidad;
  }
}

document.getElementById("vaciar-carrito").addEventListener("click", function () {
  localStorage.removeItem("carrito");
  location.reload(); 
});

function mostrarPrecioTotal() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let total = 0;

  carrito.forEach(item => {
    const producto = productos.find(p => p.id === item.id);
    if (producto) {
      const precioString = producto.precio && typeof producto.precio === 'string' ? producto.precio : "$0,00";
      const precioNumerico = parseFloat(precioString.replace("$", "").replace(",", "."));
      total += precioNumerico * item.cantidad;
    }
  });

  document.getElementById("precio-total").textContent = `Precio total: $${total.toFixed(2)}`;
}
