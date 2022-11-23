/*** DARK MODE ***/
let modo=document.getElementById("modo");
let body=document.body;

modo.addEventListener("click", function(){
    let val=body.classList.toggle("dark")
    localStorage.setItem("modo",val)
})

let valor=localStorage.getItem("modo")

if (valor=="true") {
    body.classList.add("dark")
} else {
    body.classList.remove("dark")
}

/*** SCROLL REVEAL ***/
ScrollReveal().reveal('.carousselHeader');
ScrollReveal().reveal('.cardsHeader', {delay: 500});
ScrollReveal().reveal('.cardsImage', {delay: 500});
ScrollReveal().reveal('.containabout', {delay: 500});
ScrollReveal().reveal('.headerprojects', {delay: 500});
ScrollReveal().reveal('.cardscontain', {delay: 1000});

/*** CHANGE LENGUAGE ***/
let buttonEN = document.getElementById("englishLenguage");
buttonEN.addEventListener("click", lenguage);
let buttonES = document.getElementById("spanishLenguage");
buttonES.addEventListener("click", lenguage)

function lenguage() {
    if(buttonEN) {
        location.href = "en/index.html"
    }
    if(buttonES) {
        location.href = "../index.html"
    }
}
