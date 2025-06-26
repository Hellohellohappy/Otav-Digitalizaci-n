let palabraSecreta = "fue tu culpa"; 
let palabraMostrar = []; 
let letrasAdivinadas = []; 
let errores = 0; 
const MAX_ERRORES = 6; 
let juegoTerminado = false;

let letrasContainer;
let mensajeJuego;
let reiniciarBtn;

function setup() {
  let canvas = createCanvas(400, 300); 
  canvas.parent('canvas-container'); 
  background(85); 


  for (let i = 0; i < palabraSecreta.length; i++) {
    if (palabraSecreta[i] === ' ') {
      palabraMostrar.push(' '); 
    } else {
      palabraMostrar.push('_'); 
    }
  }

  letrasContainer = select('#letras');
  mensajeJuego = select('#mensaje-juego');
  reiniciarBtn = select('#reiniciarBtn');
  reiniciarBtn.mousePressed(reiniciarJuego);

  crearBotonesLetras();
  actualizarPantalla();
}

function draw() {
  background(0); 
  dibujarAhorcado(errores); 
  mostrarPalabra(); 
}

function dibujarAhorcado(etapas) {
  stroke(255); 
  strokeWeight(2); 

  // Horca
  line(50, 280, 150, 280); 
  line(100, 280, 100, 50); 
  line(100, 50, 250, 50); 
  line(250, 50, 250, 80); 

 
  if (etapas >= 1) { 
    circle(250, 100, 40);
  }
  if (etapas >= 2) { 
    line(250, 120, 250, 200);
  }
  if (etapas >= 3) { 
    line(250, 140, 220, 170);
  }
  if (etapas >= 4) { 
    line(250, 140, 280, 170);
  }
  if (etapas >= 5) { 
    line(250, 200, 220, 240);
  }
  if (etapas >= 6) { 
    line(250, 200, 280, 240);
  }
}


function mostrarPalabra() {
  textSize(32);
  textAlign(CENTER);
  fill(0); 
  let display = palabraMostrar.join(' '); 
  text(display, width / 2, 20); 
}


function crearBotonesLetras() {
  for (let i = 0; i < 26; i++) {
    let letra = String.fromCharCode(65 + i); 
    let btn = createButton(letra);
    btn.class('letra-btn'); 
    btn.parent(letrasContainer); 
    btn.attribute('data-letra', letra.toLowerCase()); 
    btn.mousePressed(() => manejarClickLetra(btn, letra.toLowerCase()));
  }
}

function manejarClickLetra(btn, letra) {
  if (juegoTerminado) return; 

  if (letrasAdivinadas.includes(letra)) {
    return;
  }

  letrasAdivinadas.push(letra); 
  btn.class('letra-btn disabled'); 

  let letraEncontrada = false;
  for (let i = 0; i < palabraSecreta.length; i++) {
    if (palabraSecreta[i] === letra) {
      palabraMostrar[i] = letra; 
      letraEncontrada = true;
    }
  }

  if (!letraEncontrada) {
    errores++; 
  }

  actualizarPantalla();
  verificarEstadoJuego();
}

function actualizarPantalla() {

}


function verificarEstadoJuego() {
  if (palabraMostrar.join('').replace(/ /g, '') === palabraSecreta.replace(/ /g, '')) {
  mensajeJuego.html('<a href="../Final/index.html" target="_blank" style="color:red;">Seguí el camino...</a>');
  mensajeJuego.style('color', 'red');
  finalizarJuego(true);
  return;
}

  if (errores >= MAX_ERRORES) {
    mensajeJuego.html(`estamalestamalestamalestamalestamal`);
    mensajeJuego.style('color', 'red');
    finalizarJuego(false);
  }
}


function finalizarJuego(ganado) {
  juegoTerminado = true;
  let botones = selectAll('.letra-btn');
  for (let btn of botones) {
    btn.class('letra-btn disabled');
  }
  reiniciarBtn.style('display', 'block'); 
}


function reiniciarJuego() {
  palabraMostrar = [];
  letrasAdivinadas = [];
  errores = 0;
  juegoTerminado = false;

  for (let i = 0; i < palabraSecreta.length; i++) {
    if (palabraSecreta[i] === ' ') {
      palabraMostrar.push(' ');
    } else {
      palabraMostrar.push('_');
    }
  }

  mensajeJuego.html(''); 
  reiniciarBtn.style('display', 'none'); 


  let botones = selectAll('.letra-btn');
  for (let btn of botones) {
    btn.class('letra-btn'); 
  }

  actualizarPantalla();
  loop(); 
}


function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    return false;
  }
}