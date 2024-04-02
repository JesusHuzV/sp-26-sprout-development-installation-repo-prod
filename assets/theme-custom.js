document.addEventListener('DOMContentLoaded', function () {
  const showMoreButton = document.getElementById('showMoreButton');
  const testimonials = document.querySelectorAll('.custon123');

  if (testimonials.length >= 3) {
    const primeroTestimonials = testimonials[0];
    const segundoTestimonial = testimonials[testimonials.length - 1];

    showMoreButton.addEventListener('click', function () {
      primeroTestimonials.classList.remove('first:twcss-hidden');
      segundoTestimonial.classList.remove('last:twcss-hidden');
    });
  } else {
    showMoreButton.style.display = 'none';
  }
  let preguntaDesplegada = true; // Bandera para indicar si alguna pregunta está desplegada

  const botonesPregunta = document.querySelectorAll('.boton-pregunta');

  botonesPregunta.forEach(function (boton) {
    boton.addEventListener('click', function () {
      const idTema = this.getAttribute('data-id');
      if (preguntaDesplegada) {
        // Si alguna pregunta ya está desplegada, cierra todas las preguntas
        cerrarTodasPreguntas();
      }
      // Muestra las preguntas y respuestas del tema seleccionado
      mostrarPreguntas(idTema);
      preguntaDesplegada = true; // Actualiza la bandera
    });
  });

  function cerrarTodasPreguntas() {
    const preguntasRespuestas = document.querySelectorAll('.preguntas-tema');
    preguntasRespuestas.forEach(function (item) {
      item.style.display = 'none';
    });
    preguntaDesplegada = false; // Actualiza la bandera
  }

  function mostrarPreguntas(id) {
    // Obtiene todas las preguntas del tema actual
    var preguntasRespuestasTema = document.querySelectorAll(
      '.preguntas-tema[data-tema="' + id + '"]',
    );

    // Cierra todas las preguntas del tema actual
    preguntasRespuestasTema.forEach(function (item) {
      item.style.display = 'none';
    });

    // Abre la pregunta seleccionada
    var preguntaMostrar = document.getElementById(id);
    preguntaMostrar.style.display = 'block';
  }

  function cerrarPreguntasDelTema(id) {
    var preguntasAbiertas = document.querySelectorAll(
      '.preguntas-tema[data-tema="' + id + '"]',
    );

    preguntasAbiertas.forEach(function (item) {
      item.style.display = 'none';
      alert('hola');
    });
  }

  const primerBoton = document.querySelector('.boton-pregunta');

  // Verifica si se encontró algún botón de pregunta
  if (primerBoton) {
    // Obtiene el ID del tema asociado al primer botón de pregunta
    const idPrimerTema = primerBoton.getAttribute('data-id');

    // Muestra las preguntas y respuestas del primer tema por defecto
    mostrarPreguntas(idPrimerTema);
  }
});
