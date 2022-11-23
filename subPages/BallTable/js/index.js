const contain = document.querySelector(".gameContain")
/****** VARIABLES ******/

/****** MEDIDAS ******/
const tableHeight = 300;
const tableWidth = 570;
const blockHeight = 20;
const blockWidth = 100;
/****** SOUNDS ******/
let soundPlayer = new Audio();
soundPlayer.src = "./sounds/soundPlayer.mp3";
let soundBlock = new Audio();
soundBlock.src = "./sounds/soundBlock.mp3";
let soundGameOver = new Audio();
soundGameOver.src = "./sounds/soundGameOver.mp3";
let soundVictory = new Audio();
soundVictory.src = "./sounds/soundVictory.mp3"
/****** PLAYER & BLOCK ******/
const positionPlayer = [230,10];
let positionPlayerActual = positionPlayer;
var puntaje = 0;



const posicionInicialBola = [270,40]
let posicionActualBola = posicionInicialBola
let bolaDireccionX = 2;
let bolaDireccionY = 2;
let diametro = 20;
let timerID 

/******CREACION DE CLASE PARA DIBUJAR LOS BLOQUES ******/
class Block {
    constructor(ejeX, ejeY) {
        this.buttonLeft = [ejeX,ejeY]
        this.buttonRight = [ejeX + blockWidth, ejeY]
        this.topLeft = [ejeX,ejeY + blockHeight]
        this.topRight = [ejeX + blockWidth, ejeY + blockHeight]
    }
}

const blocks  = [
    new Block(10, 250),
    new Block(120, 250),
    new Block(230, 250),
    new Block(340, 250),
    new Block(450, 250),
    new Block(10, 220),
    new Block(120, 220),
    new Block(230, 220),
    new Block(340, 220),
    new Block(450, 220),
    new Block(10, 190),
    new Block(120, 190),
    new Block(230, 190),
    new Block(340, 190),
    new Block(450, 190),
]

/****** FUNCTIONS ******/

/****** CREAR BLOQUES ******/
function addBlock () {
    for(let i = 0; i < blocks.length; i++) {
        const block = document.createElement("div")
        block.classList.add("block")
        block.style.left = blocks[i].buttonLeft[0] + "px"
        block.style.bottom = blocks[i].buttonLeft[1] + "px"
        contain.appendChild(block)
    }
}
addBlock()

/****** CREAR PLAYER ******/
function addPlayer() {
    player.style.left = positionPlayer[0] + "px"
    player.style.bottom = positionPlayer[1] + "px"
}

const player = document.createElement("div")
player.classList.add("player")
contain.appendChild(player)

addPlayer()

/****** MOVER PLAYER ******/
function movePlayer(event) {
    switch(event.key) {
        case "ArrowLeft":
            if(positionPlayerActual[0] > 0) {
                positionPlayerActual[0] -= 10
                addPlayer()
            }
            break
        case "ArrowRight":
            if(positionPlayerActual[0] < (tableWidth - blockWidth)){
                positionPlayerActual[0] += 10
                addPlayer()
            } 
    }
}

document.addEventListener("keydown", movePlayer)

/****** CREAR BOLA ******/

function addBall() {
    bola.style.left = posicionInicialBola[0]+ 'px'
    bola.style.bottom = posicionInicialBola[1]+ 'px'
}
const bola = document.createElement('div')
bola.classList.add('bola')
contain.appendChild(bola)
addBall()

/****** MOVIMIENTO BOLA ******/

function moveBall() {
    posicionActualBola[0] += bolaDireccionX
    posicionActualBola[1] += bolaDireccionY
    addBall()
    collisionBall()
    gameOver()
}

timerID = setInterval(moveBall, 15)

/****** COLISION BLOQUES ******/

function collisionBall() {
    for (let i = 0; i < blocks.length; i++){
        if( (posicionActualBola[0] > blocks[i].buttonLeft[0] && posicionActualBola[0] < blocks[i].buttonRight[0]) &&
            ((posicionActualBola[1]  + diametro) > blocks[i].buttonLeft[1] && posicionActualBola[1] < blocks[i].topLeft[1])
        ){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            changeDirection()
            soundBlock.play()
            puntaje++;
            document.getElementById("points").innerHTML = puntaje;
            if(puntaje == 15) {
                gameOverVictory()
            }
            

        }
    }

    if(
        posicionActualBola[0] >= (tableWidth - diametro) ||
        posicionActualBola[1] >= (tableHeight - diametro) ||
        posicionActualBola[0] <= 0 ||
        posicionActualBola[1] <= 0
    ){
        changeDirection()
    }

    if((posicionActualBola[0] > positionPlayerActual[0] && posicionActualBola[0] < positionPlayerActual[0] + blockWidth) && 
    (posicionActualBola[1] > positionPlayerActual[1] && posicionActualBola[1] < positionPlayerActual[1] + blockHeight)
    ){
        changeDirection()
        soundPlayer.play()
    }
}

/****** DIRECCION ******/

function changeDirection() {
    if(bolaDireccionX === 2 && bolaDireccionY === 2){
        bolaDireccionY = -2
        return
    }
    if(bolaDireccionX === 2 && bolaDireccionY === -2){
        bolaDireccionX = -2
        return
    }
    if(bolaDireccionX === -2 && bolaDireccionY === -2){
        bolaDireccionY = 2
        return
    }
    if(bolaDireccionX === -2 && bolaDireccionY === 2){
        bolaDireccionX = 2
        return
    }
}

/****** GAME OVER ******/

function gameOver(){
    if(posicionActualBola[1] <= 0){
        clearInterval(timerID)
        document.removeEventListener('keydown',movePlayer)
        soundGameOver.play()
        document.getElementById("button").style.visibility = "visible";
    
    }
}


function gameOverVictory() {
    document.getElementById("victory").style.visibility = "visible"
    document.removeEventListener('keydown',movePlayer)
    bola.classList.remove("bola");
    soundGameOver.src = " ";
    soundBlock.src = " ";
    soundPlayer.src = " ";
    document.getElementById("buttonVictory").style.visibility = "visible"
    soundVictory.play()

}
