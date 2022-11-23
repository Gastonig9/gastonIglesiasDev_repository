const width = 400;
const height = 400;
let audio = document.getElementById("sonido")
let $mapa = document.getElementById("mapa")
let $distanciaString = document.getElementById("distancia")
let clicks = 0;
let alertTesoro = "Felicidades";

let objetivo = {
    x: getRandomNumber(width),
    y: getRandomNumber(height)
}

function getRandomNumber(size) {
    return Math.floor(Math.random() * size) ;
}

function getDistance(e, target) {
    let diffX = e.offsetX - target.x;
    let diffY = e.offsetY - target.y;
    return Math.sqrt(diffX * diffX) + (diffY + diffY);
}

function getDistanceHint(distance) {
    if(distance < 30) {
        return "Te quemas!";
    } else if(distance < 40) {
        return "Estas muy cerca. Muy Caliente!";
    } else if(distance < 60) {
        return "Falta poco. Caliente!";
    } else if(distance < 100) {
        return "Casi casi, estas calido";
    } else if (distance < 180) {
        return "Te estas alejando. Muy Frio";
    } else if(distance < 360) {
        return "Congelado";
    } else {
        return "Estas demasiado lejos!";
    }


}



$mapa.addEventListener("click", function(e) {
    clicks++;
    let distance = getDistance(e, objetivo);
    let distanciaObjetivo = getDistanceHint(distance);
    console.log(getDistanceHint(distance))
    $distanciaString.innerHTML = getDistanceHint(distance)

    if(distance < 20) {
        audio.innerHTML += `<audio id="audiozelda" src="sounds/zeldasound.mp3" autoplay></audio>`;
        alert( `¡Haz encontrado el tesoro en ${clicks}`) 
        location.reload();
    }
    
    
})