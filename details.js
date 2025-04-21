// Paso 1: Capturar el id desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Paso 2: Cargar el JSON y buscar el producto
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

// Paso 3: Renderizar el producto
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
}
document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById('add-to-cart');
    addButton?.addEventListener('click', () => {
      const cantidad = parseInt(document.getElementById('cantidad').value, 10);
      const producto = {
        id,
        cantidad
      };
  
      // Obtener carrito actual del localStorage
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
      // Ver si ya existe ese producto en el carrito
      const existente = carrito.find(p => p.id == producto.id);
      if (existente) {
        existente.cantidad += cantidad;
      } else {
        carrito.push(producto);
      }
  
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarCarritoNavbar();
    });
  });
  // Escuchar clic en el botón "Añadir al carrito"
document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    const quantity = parseInt(document.getElementById('quantity').value);
    const currentCount = parseInt(localStorage.getItem('cartCount')) || 0;
    const newCount = currentCount + quantity;
  
    localStorage.setItem('cartCount', newCount);
    updateCartCount();
  });
  
  // Actualiza visualmente el número del carrito
  function updateCartCount() {
    const count = localStorage.getItem('cartCount') || 0;
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = count;
    }
  }
  
  // Al cargar la página, actualiza el número del carrito
  document.addEventListener('DOMContentLoaded', updateCartCount);
  
  function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    const index = carrito.findIndex(p => p.id === producto.id);
  
    if (index >= 0) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
  
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
  }
  