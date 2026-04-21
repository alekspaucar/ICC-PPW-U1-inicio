'use strict';

// Datos estudiante
const estudiante = {
  nombre: 'Alexander Vizhnay',
  carrera: 'Ingeniería de Sistemas',
  semestre: 5
};

// Datos lista
const elementos = [
  { id: 1, titulo: 'Proyecto Web', descripcion: 'Terminar práctica JS', categoria: 'Estudio', prioridad: 'Alta', activo: true },
  { id: 2, titulo: 'Comprar comida', descripcion: 'Ir al supermercado', categoria: 'Personal', prioridad: 'Media', activo: true },
  { id: 3, titulo: 'Reunión', descripcion: 'Equipo de trabajo', categoria: 'Trabajo', prioridad: 'Alta', activo: false },
  { id: 4, titulo: 'Leer libro', descripcion: 'Capítulo de JS', categoria: 'Estudio', prioridad: 'Baja', activo: true },
  { id: 5, titulo: 'Ejercicio', descripcion: 'Salir a correr', categoria: 'Personal', prioridad: 'Media', activo: false },
  { id: 6, titulo: 'Deploy', descripcion: 'Subir proyecto', categoria: 'Trabajo', prioridad: 'Alta', activo: true }
];

// Mostramos la informacion
function mostrarInfoEstudiante() {
  document.getElementById('estudiante-nombre').textContent = estudiante.nombre;
  document.getElementById('estudiante-carrera').textContent = estudiante.carrera;
  document.getElementById('estudiante-semestre').textContent = `${estudiante.semestre}° semestre`;
}

// Render lista
function renderizarLista(datos) {
  const contenedor = document.getElementById('contenedor-lista');
  contenedor.innerHTML = '';

  datos.forEach(el => {
    const card = document.createElement('div');
    card.classList.add('card');

    const titulo = document.createElement('h3');
    titulo.textContent = el.titulo;

    const descripcion = document.createElement('p');
    descripcion.textContent = el.descripcion;

    const categoria = document.createElement('span');
    categoria.textContent = el.categoria;

    const prioridad = document.createElement('span');
    prioridad.textContent = el.prioridad;

    const estado = document.createElement('span');
    estado.textContent = el.activo ? 'Activo' : 'Inactivo';

    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';

    btn.addEventListener('click', () => {
      eliminarElemento(el.id);
    });

    card.appendChild(titulo);
    card.appendChild(descripcion);
    card.appendChild(categoria);
    card.appendChild(prioridad);
    card.appendChild(estado);
    card.appendChild(btn);

    contenedor.appendChild(card);
  });

  actualizarEstadisticas();
}

// Eliminar
function eliminarElemento(id) {
  const index = elementos.findIndex(el => el.id === id);
  if (index !== -1) {
    elementos.splice(index, 1);
    renderizarLista(elementos);
  }
}

// Estadísticas
function actualizarEstadisticas() {
  document.getElementById('total-elementos').textContent = elementos.length;
  document.getElementById('elementos-activos').textContent =
    elementos.filter(el => el.activo).length;
}

// Filtros
function inicializarFiltros() {
  const botones = document.querySelectorAll('.btn-filtro');

  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      const categoria = btn.dataset.categoria;

      document.querySelectorAll('.btn-filtro')
        .forEach(b => b.classList.remove('btn-filtro-activo'));

      btn.classList.add('btn-filtro-activo');

      if (categoria === 'todas') {
        renderizarLista(elementos);
      } else {
        const filtrados = elementos.filter(e => e.categoria === categoria);
        renderizarLista(filtrados);
      }
    });
  });
}

// INICIO (Paso 7)
mostrarInfoEstudiante();
renderizarLista(elementos);
inicializarFiltros();