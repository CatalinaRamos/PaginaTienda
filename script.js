document.querySelector('.hero-button').addEventListener('click', function (e) {
  e.preventDefault();

  const info = document.getElementById('mas-info');
  info.style.display = 'block';
  document.querySelector('.hero-section').style.display = 'none';
  
  

  info.scrollIntoView({ behavior: 'smooth' });
});
function mostrarSeccion(id) {
  // Oculta todas las secciones
  document.querySelectorAll('.seccion').forEach(seccion => {
      seccion.classList.remove('activa');
  });

  // Muestra la sección seleccionada
  document.getElementById(id).classList.add('activa');

  // Remueve la clase 'activo' de todos los enlaces
  document.querySelectorAll('.menu ul li a').forEach(link => {
      link.classList.remove('activo');
  });

  // Agrega la clase 'activo' al enlace seleccionado
  document.querySelector(`.menu ul li a[href="#"][onclick="mostrarSeccion('${id}')"]`).classList.add('activo');
}
