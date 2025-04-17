
  document.querySelector('.hero-button').addEventListener('click', function (e) {
    e.preventDefault();
    
    // Ocultar la sección principal
    document.getElementById('principal').style.display = 'none';

    // Mostrar la sección de información
    const info = document.getElementById('mas-info');
    info.style.display = 'block';
    info.scrollIntoView({ behavior: 'smooth' });
  });

