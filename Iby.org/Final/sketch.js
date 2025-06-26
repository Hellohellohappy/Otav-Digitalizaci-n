let escenas = [];
let textos = [];
let escenaActual = 0;
let textoCompleto = "";
let textoMostrado = "";
let letraIndex = 0;
let siguientePermitido = false;
let timer;
let textboxDiv;
let canvasAncho = 768; // Mantener estas como referencia al tamaño original
let canvasAlto = 768; // Mantener estas como referencia al tamaño original

function preload() {
  // AÑADE .addClass('scene-0-img') AQUÍ
  escenas[0] = createImg("assets/alarmagif.gif").addClass('scene-0-img');
  escenas[1] = createGraphics(768, 768);
  escenas[2] = loadImage("assets/Esena 3.png");
  escenas[3] = loadImage("assets/rostro.png");
  escenas[4] = loadImage("assets/Esena 3.png");
  escenas[5] = loadImage("assets/Escena final.png");

  escenas[2].loadPixels();
  // canvasAncho y canvasAlto ya están definidos arriba, si estas líneas causan un problema se pueden eliminar
  // canvasAncho = escenas[2].width;
  // canvasAlto = escenas[2].height;
  
  textos[0] = "El reloj marca las 03:00am, no puedo dormir. \nCada vez que apoyo mi cabeza en la almohada mis propios pensamientos me atacan como navajas filosas.\nMe ahogo en la sensación de impotencia que invade cuerpo, contaminándome desdés las entrañas.\nSiento que voy a vomitar sangre…";
  textos[1] = "Me levanto dando pasos pesados y enciendo mi computadora, el mundo virtual me brinda el sobre estímulo suficiente para acallar mi mente.\nTermino de teclear y subo la última entrada al blog.";
  textos[2] = "Mi cuerpo se siente débil, no tengo energía para moverme, sin embargo logro arrastrarme hasta la terraza de mi edificio....";
  textos[3] = "La noche está hermosa…";
  textos[4] = "El viento fresco golpea mi rostro mientras corro hacia la noche.";
  textos[5] = "";
}

function setup() {
  createCanvas(canvasAncho, canvasAlto); // Usa las dimensiones de referencia
  textboxDiv = createDiv("").addClass("textbox");
  iniciarEscena(0);
}

function draw() {
  background(0);

  if (escenaActual === 0) {
    escenas[0].show();
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    escenas[0].position(x, y);
    // Mantenemos size(), pero las reglas CSS con !important lo sobrescribirán si es necesario para escalar
    escenas[0].size(width, height); 
  } else {
    escenas[0].hide();
    if (escenaActual === 1) {
      // Asegúrate de que las imágenes también usen el ancho y alto del canvas actual
      image(escenas[1], 0, 0, width, height); 
    } else {
      image(escenas[escenaActual], 0, 0, width, height);
    }
  }
}

function keyPressed() {
  if (siguientePermitido && escenaActual < escenas.length - 1) {
    iniciarEscena(escenaActual + 1);
  }
}

function iniciarEscena(index) {
  escenaActual = index;
  textoCompleto = textos[index];
  textoMostrado = "";
  letraIndex = 0;
  siguientePermitido = false;
  if (index === 1) {
    escenas[1].background(0);
  }
  if (textoCompleto === "") {
    textboxDiv.hide();
  } else {
    textboxDiv.show();
    clearInterval(timer);
    timer = setInterval(mostrarTexto, 10);
  }
}

function mostrarTexto() {
  if (letraIndex < textoCompleto.length) {
    textoMostrado += textoCompleto.charAt(letraIndex);
    textboxDiv.html(textoMostrado.replace(/\n/g, "<br>"));
    letraIndex++;
  } else {
    clearInterval(timer);
    siguientePermitido = true;
  }
}