// Obtener el id del producto desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');


// Cargar los datos del producto
fetch('productos.json')
  .then(response => response.json())
  .then(data => {
    const producto = data.find(p => p.id == id);
    if (producto) {
      renderProduct(producto);
    } else {
      document.body.innerHTML = '<p>Producto no encontrado</p>';
    }
  })
  .catch(error => {
    console.error('Error cargando el producto:', error);
  });

// Renderiza el producto en la página
function renderProduct(prod) {
  document.getElementById('prod-name').textContent = prod.nombre;
  document.getElementById('prod-price').textContent = prod.precio;
  document.getElementById('prod-desc').textContent = prod.descripcion;

  const mainImg = document.getElementById('main-img');
  const thumbs = document.getElementById('thumbnails');

  mainImg.src = prod.images[0];
  mainImg.alt = prod.nombre;

  prod.images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = prod.nombre;
    img.classList.add('thumb');
    img.addEventListener('click', () => {
      mainImg.src = src;
    });
    thumbs.appendChild(img);
  });

  // Agregar al carrito
  document.getElementById('add-to-cart').addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById('cantidad').value, 10);
    const productoCarrito = {
      id: prod.id,
      nombre: prod.nombre,
      imagen: prod.images[0],
      cantidad
    };

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const existente = carrito.find(p => p.id == productoCarrito.id);

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carrito.push(productoCarrito);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoNavbar();
  });
}


// Actualiza el contador del carrito en el navbar
function actualizarCarritoNavbar() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const cartDiv = document.getElementById('cart-count');
  if (cartDiv) {
    cartDiv.textContent = total;
  }
}

// Cuando se carga la página, actualiza el contador del carrito
document.addEventListener('DOMContentLoaded', actualizarCarritoNavbar);


// Ejecutar al cargar cualquier página
document.addEventListener("DOMContentLoaded", actualizarCarritoNavbar);

// Redirigir al hacer clic en el carrito
const carritoIcon = document.querySelector('.navbar-shopping-cart');
if (carritoIcon) {
  carritoIcon.addEventListener('click', () => {
    window.location.href = 'carrito.html';
  });
}
