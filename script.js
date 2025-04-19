document.querySelector('.hero-button').addEventListener('click', function (e) {
  e.preventDefault();
  document.body.classList.add('show-content');
  document.getElementById('mas-info').scrollIntoView({ behavior: 'smooth' });
});

function mostrarSeccion(id) {
  // Oculta todas las secciones
  document.querySelectorAll('.seccion').forEach(seccion => {
    seccion.classList.remove('activa');
  });

  // Muestra la sección seleccionada
  const seccionActiva = document.getElementById(id);
  if (seccionActiva) {
    seccionActiva.classList.add('activa');
  }

  // Cambia la clase 'activo' en los links
  document.querySelectorAll('.menu-link').forEach(link => {
    link.classList.toggle('activo', link.getAttribute('data-id') === id);
  });
}
