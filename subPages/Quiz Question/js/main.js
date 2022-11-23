let INDEX_PREGUNTA = 0;
let puntaje = 0;
let soundCorrect = new Audio();
soundCorrect.src = "./media/answerCorrect.mp3";
let soundFail = new Audio();
soundFail.src = "./media/answerFail.mp3";


cargarPregunta(INDEX_PREGUNTA)

function cargarPregunta(index) {
  objetoPregunta = basePreguntas[index]
  opciones = [...objetoPregunta.incorrectas]
  opciones.push(objetoPregunta.respuesta)
  
  for(let i = 0; i < 4; i++) {
    opciones.sort(()=>Math.random() - 0.5)
  }

  document.getElementById("question").innerHTML = objetoPregunta.pregunta;
  document.getElementById("categoria").innerHTML = objetoPregunta.categoria;
  document.getElementById("opcion_1").innerHTML = opciones[0]
  document.getElementById("opcion_2").innerHTML = opciones[1]
  document.getElementById("opcion_3").innerHTML = opciones[2]
  document.getElementById("opcion_4").innerHTML = opciones[3]
  if(objetoPregunta.imagen) {
    document.getElementById("imagen").src = objetoPregunta.imagen
    document.getElementById("imagen").style.display = "";
  }else{
    document.getElementById("imagen").style.display = "none";
  }

  if(objetoPregunta.categoria === "Politica/Historia") {
    document.getElementById("categoria").style.backgroundColor = "rgb(237, 100, 196)";
  }
  if(objetoPregunta.categoria === "Entretenimiento") {
    document.getElementById("categoria").style.backgroundColor = "cornflowerblue";
  }
  if(objetoPregunta.categoria === "Deportes") {
    document.getElementById("categoria").style.backgroundColor = "darkgoldenrod";
  }
  if(objetoPregunta.categoria === "Geografia") {
    document.getElementById("categoria").style.backgroundColor = "darkgreen";
  }
  if(objetoPregunta.categoria === "Arte") {
    document.getElementById("categoria").style.backgroundColor = "purple";
  }
  if(objetoPregunta.categoria === "Ciencia") {
    document.getElementById("categoria").style.backgroundColor = "blue";
  }
  if(objetoPregunta.categoria === "Otras") {
    document.getElementById("categoria").style.backgroundColor = "black";
  }



}

async function seleccionarOpciones(index) {
  let validacionRespuesta = opciones[index] == objetoPregunta.respuesta;
  if(validacionRespuesta) {
    soundCorrect.play();
    await Swal.fire({
      title:"Respuesta Correcta",
      text:"La respuesta es correcta",
      icon:"success"
    });
    puntaje++;
  }else {
    soundFail.play()
    await Swal.fire({
      title:"Respuesta Incorrecta",
      html:`La respuesta correcta es ${objetoPregunta.respuesta}`,
      icon:"error"
    })
  }
  INDEX_PREGUNTA++;
  if(INDEX_PREGUNTA >=basePreguntas.length) {
    INDEX_PREGUNTA = 0
    await Swal.fire({
      title:"EL JUEGO HA FINALIZADO",
      html:`El puntaje final es de ${puntaje}${basePreguntas.length}`,
      icon:"info"
    })
  }
  cargarPregunta(INDEX_PREGUNTA);
}
