function getRandomNumber() {
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