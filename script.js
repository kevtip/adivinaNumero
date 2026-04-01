// 1. SELECCIÓN DE ELEMENTOS DEL HTML
// Aquí capturamos los elementos usando sus id.

// Captura el input donde el usuario escribe el número
const inputIntento = document.getElementById('inputIntento');

// Captura el botón para adivinar
const btnAdivinar = document.getElementById('btnAdivinar');

// Captura el párrafo donde se mostrarán los mensajes
const mensaje = document.getElementById('mensaje');

// Captura el párrafo donde se verá el número de intentos
const contador = document.getElementById('contador');

// Captura el contenedor del historial
const historial = document.getElementById('historial');

// Captura el botón para reiniciar el juego
const btnReiniciar = document.getElementById('btnReiniciar');

// Captura la tarjeta principal para cambiarle estilos visuales
const gameCard = document.getElementById('gameCard');

// 2. VARIABLES DEL JUEGO
// Genera un número aleatorio entre 1 y 100
let numeroSecreto = Math.floor(Math.random() * 100) + 1;

// Guarda la cantidad de intentos realizados
let intentos = 0;

// Guarda todos los intentos en un arreglo
let historialIntentos = [];

// Muestra en consola el número secreto solo para pruebas
console.log('Número secreto actual:', numeroSecreto);


// ------------------------------------------------------
// 3. FUNCIÓN PARA MOSTRAR MENSAJES
function mostrarMensaje(texto, color) {
  // Cambia el texto del elemento mensaje
  mensaje.textContent = texto;

  // Cambia el color del texto del mensaje
  mensaje.style.color = color;
}

// 4. FUNCIÓN PARA CREAR UNA PASTILLA EN EL HISTORIAL
// Cada intento aparecerá como una burbuja de color.
function agregarPastillaAlHistorial(valor, colorFondo, colorTexto) {
  // Crea un nuevo elemento span
  const pastilla = document.createElement('span');

  // Le agrega la clase guess-pill para que tome estilos CSS
  pastilla.classList.add('guess-pill');

  // Coloca el número intentado dentro de la pastilla
  pastilla.textContent = valor;

  // Cambia el color de fondo de la pastilla
  pastilla.style.backgroundColor = colorFondo;

  // Cambia el color del texto
  pastilla.style.color = colorTexto;

  // Inserta la pastilla dentro del historial
  historial.appendChild(pastilla);
}

// 5. FUNCIÓN PARA OBTENER UNA PISTA SEGÚN LA CERCANÍA
// Compara qué tan cerca estuvo el intento del número secreto.

function obtenerPista(intento, secreto) {
  // Calcula la diferencia absoluta entre intento y secreto
  let diferencia = Math.abs(intento - secreto);

  // Si está muy cerca, devuelve mensaje especial
  if (diferencia <= 5) {
    return '🔥 ¡Muy cerca!';
  }
  // Si está algo cerca
  else if (diferencia <= 15) {
    return '♨️ Caliente';
  }
  // Si está a una distancia intermedia
  else if (diferencia <= 30) {
    return '🌤️ Tibio';
  }
  // Si está muy lejos
  else {
    return '❄️ Frío';
  }
}

// 6. FUNCIÓN PRINCIPAL: VERIFICAR EL INTENTO
// Lee el número del usuario, lo valida y lo compara.
function verificarIntento() {
  // Convierte a número el valor escrito en el input
  let valor = Number(inputIntento.value);

  // Valida si el valor no es un número o está fuera del rango 1-100
  if (isNaN(valor) || valor < 1 || valor > 100) {
    mostrarMensaje('⚠️ Escribe un número válido del 1 al 100', '#ff4d6d');
    return; // Detiene la función si el dato es inválido
  }

  // Suma 1 al contador de intentos
  intentos++;

  // Actualiza el texto del contador en pantalla
  contador.textContent = 'Intentos: ' + intentos;

  // Guarda el intento dentro del arreglo historialIntentos
  historialIntentos.push(valor);

  // Si el usuario acierta
  if (valor === numeroSecreto) {
    // Agrega una pastilla verde al historial
    agregarPastillaAlHistorial(valor, '#b7efc5', '#1b4332');

    // Muestra mensaje de victoria
    mostrarMensaje('🎉 ¡Correcto! El número era ' + numeroSecreto, '#06d6a0');

    // Desactiva el botón para que no siga jugando en esa ronda
    btnAdivinar.disabled = true;

    // Muestra el botón para reiniciar
    btnReiniciar.style.display = 'inline-block';

    // Cambia el estilo de la tarjeta para celebrar visualmente
    gameCard.style.background = '#f1fffa';
    gameCard.style.borderColor = '#06d6a0';
    gameCard.style.boxShadow = '8px 8px 0 #222, 0 0 25px rgba(6, 214, 160, 0.5)';
  }

  // Si el número ingresado es mayor que el secreto
  else if (valor > numeroSecreto) {
    // Guarda la pista de cercanía
    let pista = obtenerPista(valor, numeroSecreto);

    // Agrega una pastilla rosada al historial
    agregarPastillaAlHistorial(valor, '#ffccd5', '#9d0208');

    // Muestra mensaje indicando que se pasó
    mostrarMensaje('📈 Muy alto. ' + pista, '#ef476f');
  }

  // Si el número ingresado es menor que el secreto
  else {
    // Guarda la pista de cercanía
    let pista = obtenerPista(valor, numeroSecreto);

    // Agrega una pastilla celeste al historial
    agregarPastillaAlHistorial(valor, '#caf0f8', '#0077b6');

    // Muestra mensaje indicando que faltó subir
    mostrarMensaje('📉 Muy bajo. ' + pista, '#118ab2');
  }

  // Limpia el input para escribir otro intento
  inputIntento.value = '';

  // Devuelve el foco al input para seguir jugando rápido
  inputIntento.focus();
}

// 7. FUNCIÓN PARA REINICIAR EL JUEGO

function reiniciarJuego() {
  // Genera un nuevo número secreto aleatorio
  numeroSecreto = Math.floor(Math.random() * 100) + 1;

  // Reinicia la cantidad de intentos
  intentos = 0;

  // Vacía el arreglo de historial
  historialIntentos = [];

  // Actualiza el texto del contador
  contador.textContent = 'Intentos: 0';

  // Limpia visualmente el historial del HTML
  historial.innerHTML = '';

  // Coloca un nuevo mensaje inicial
  mostrarMensaje('Nuevo juego iniciado. ¡Adivina el número!', '#ff4d6d');

  // Activa nuevamente el botón adivinar
  btnAdivinar.disabled = false;

  // Oculta el botón reiniciar
  btnReiniciar.style.display = 'none';

  // Limpia el input
  inputIntento.value = '';

  // Devuelve el foco al input
  inputIntento.focus();

  // Restablece los estilos originales de la tarjeta
  gameCard.style.background = '#ffffff';
  gameCard.style.borderColor = '#222';
  gameCard.style.boxShadow = '8px 8px 0 #222';

  // Muestra el nuevo número secreto en consola para pruebas
  console.log('Nuevo número secreto:', numeroSecreto);
}


// 8. EVENTOS
// Aquí conectamos botones y teclado con las funciones.

// Cuando el usuario haga clic en el botón, se ejecuta verificarIntento
btnAdivinar.addEventListener('click', verificarIntento);

// Cuando el usuario presione una tecla dentro del input
inputIntento.addEventListener('keypress', function (evento) {
  // Si la tecla presionada fue Enter
  if (evento.key === 'Enter') {
    // Ejecuta la función verificarIntento
    verificarIntento();
  }
});

// Cuando se haga clic en el botón reiniciar
btnReiniciar.addEventListener('click', reiniciarJuego);


// ------------------------------------------------------
// 9. MENSAJE INICIAL
// Muestra un mensaje apenas carga el juego.
// ------------------------------------------------------
mostrarMensaje('¡Bienvenido al mundo Adivina el número!', '#ff4d6d');