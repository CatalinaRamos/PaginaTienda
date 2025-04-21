const menuIcon = document.querySelector('.menus');
const menuList = document.querySelector('.menu ul');// Función para mostrar solo la sección seleccionada
// Escucha clics y activa sección
document.querySelectorAll('.menu ul li a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); 
    const id = this.dataset.seccion;
    mostrarSeccion(id);

    // Actualizar clases activas
    document.querySelectorAll('.menu ul li a').forEach(l => l.classList.remove('activo'));
    this.classList.add('activo');
  });
});

// Función para mostrar solo la sección seleccionada
function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(seccion => {
    seccion.classList.remove('activa');
  });

  const target = document.getElementById(id);
  if (target) target.classList.add('activa');
}



// Mostrar la sección de Ruanas por defecto
document.addEventListener("DOMContentLoaded", function () {
  mostrarSeccion('Ruanas');
});



menuIcon.addEventListener('click', () => {
  menuList.classList.toggle('show');
});
function actualizarCarritoNavbar() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const cartDiv = document.querySelector('.navbar-shopping-cart div');
  if (cartDiv) {
    cartDiv.textContent = total;
  }
}
function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  document.getElementById("cart-count").textContent = totalCantidad;
}


// Ejecutar al cargar cualquier página
document.addEventListener("DOMContentLoaded", actualizarCarritoNavbar);
// Redirigir al hacer clic en el carrito
const carritoIcon = document.querySelector('.navbar-shopping-cart');
if (carritoIcon) {
  carritoIcon.addEventListener('click', () => {
    window.location.href = 'carrito.html';
  });
}
