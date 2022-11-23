const KEY_API = "6a604e7ee2c005697546c46d1ba1418b";
document.querySelector("#scroll-clima > div")

const obtenerDataClima = position => {
    const  { latitude, longitude } = position.coords
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${KEY_API}`)
         .then(response => response.json())
         .then(data => dataClima(data))
}

const dataClima = data => {
    console.log(data);
    const informacion = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity + "%",
        pressure: data.main.pressure + " " +"hPa",
        temperature: data.main.temp + "°",
        date: obtenerFecha()
    }

    Object.keys(informacion).forEach( key => {
        document.getElementById(key).textContent = informacion[key];
    })

}

const obtenerFecha = () => {
    let date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}


const onLoad = () => {
    navigator.geolocation.getCurrentPosition(obtenerDataClima);
}