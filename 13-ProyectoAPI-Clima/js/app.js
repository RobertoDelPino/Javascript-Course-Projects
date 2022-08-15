// Fetch API desde una API

const cargarAPIBtn = document.querySelector('#cargarAPI');
cargarAPIBtn.addEventListener('click', obtenerDatos);

const form = document.querySelector("form");


function obtenerDatos(e) {
    e.preventDefault();
    const ciudad = document.querySelector("#Ciudad");
    const pais = document.querySelector("#Pais");
    const error = ComprobarDatos();
    if(error == ""){
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + ciudad.value + ',' + pais.value + '&appid=da1386b29ae117a4f45f50de8a80d1c8') 
        .then( respuesta => {
            return respuesta.json()
        })
        .then(resultado => {
            if(resultado.cod == 404){
                console.log("No se pudo encontrar el lugar indicado")
                mostrarError("No se pudo encontrar el lugar indicado")
            }
            else{
                mostrarHTML(resultado);
                console.log(resultado);
            }
            form.reset();
        })
    }
    else{
        mostrarError(error);
    }
}

function ComprobarDatos()
{
    const ciudad = document.querySelector("#Ciudad");
    const pais = document.querySelector("#Pais");

    if(ciudad.value == "")
    {
        return "Debe de indicar una ciudad";
    }
    else{
        if(pais.value == "")
        {
            return "Debe de indicar un pais para realizar la búsqueda";
        }
        else{
            return "";
        }
    }
}

function mostrarError(mensaje)
{
    const contenido = document.querySelector('#contenido');

    contenido.innerHTML = `
        <p>${mensaje}</p>
    `
}

function mostrarHTML({wind,weather,name,main}) {
    const contenido = document.querySelector('#contenido');

    contenido.innerHTML = `
        <h1>Nombre Ciudad: ${name} </h1>
        <p>Temperatura media: ${Math.floor(main.temp - 273.15)}°C </p>
        <p>Temperatura max: ${Math.floor(main.temp_max - 273.15)}°C </p>
        <p>Temperatura min: ${Math.floor(main.temp_min - 273.15)}°C </p>
        <p>Velocidad Viento: ${wind.speed} km/h </p>
        <p>Tiempo: ${weather[0].main} </p>
    `
}