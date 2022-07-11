const marca = document.querySelector('#ElegirMarca');
const years = document.querySelector('#year');
const todosTiposSeguros = document.querySelectorAll("input");
const formulario = document.querySelector('#formulario');
const mostrarResultados = document.querySelector('.enviar');

// Constructor
function Seguro(marca, anio, tipo)
{
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

const seguro = new Seguro("","","");

Seguro.prototype.cotizarSeguro = function()
{
    this.eliminarSeguros();
    const div = document.createElement('div');
    div.innerHTML = `
        <h4>Cuota seguro:</h4>
        <p>Marca: ${this.marca}</p>
        <p>Year: ${this.anio}</p>
        <p>Tipo: ${this.tipo}</p>
        <p>Coste: ${this.calcularCoste()}</p> 
    `;
    div.classList = "Seguro-Cotizado";
    formulario.insertBefore(div, mostrarResultados);
}

// Funcion añadida al prototype para calcular el coste de la cotizacion
Seguro.prototype.calcularCoste = function()
{
    let cantidad;
    const base = 2000;

    switch(this.marca){
        case 'Americano':
            cantidad = base * 1.15;
            break;
        case 'Asiatico':
            cantidad = base * 1.05;
            break;
        case 'Europeo':
            cantidad = base * 1.35;
            break;
    }

    const diferencia = new Date().getFullYear() - this.anio;
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    if(this.tipo === 'Basico') {
         cantidad *= 1.30;
    } else {
         cantidad *= 1.50;
    }
    return cantidad;
}

// Obtener datos del formulario
marca.addEventListener('change', e => {
    seguro.marca = e.target.value;
});

years.addEventListener('change', e => {
    seguro.anio = e.target.value;
});

// Comprobar resultados
formulario.addEventListener('submit', e => {
    e.preventDefault();

    seguro.tipo = document.querySelector('input[name="tipo"]:checked').id;

    if (seguro.comprobarFormulario())
    {
        seguro.cotizarSeguro();
    }
});

// Comprobar el formulario

Seguro.prototype.comprobarFormulario = function()
{
    const {marca,tipo,anio} = seguro
    let noerror = true;
    if (marca != "" && tipo != "" && anio != "")
    {
        if (document.querySelector('.cajaError') != ""){
            eliminarMensajeError();
        }
        if(document.querySelector('.Seguro-Cotizado') != ""){
            seguro.eliminarSeguros();
        }
    }
    else
    {
        noerror = false;  
        if (document.querySelector('.cajaError') == null){
            const error = document.createElement("p");
            error.textContent = "Faltan datos por introducir";
            error.classList = "cajaError";
            formulario.insertBefore(error, mostrarResultados); 
        }
        if(document.querySelector('.Seguro-Cotizado') != ""){
            seguro.eliminarSeguros();
        }
    }
    return noerror;
}

// Zona de eliminación

Seguro.prototype.eliminarSeguros = function()
{
    const eliminarSeguro = document.querySelector('.Seguro-Cotizado');
    if(eliminarSeguro != null)
    {
        eliminarSeguro.remove();
    }
}

function eliminarMensajeError()
{
    const mensajeError = document.querySelector('.cajaError');
    if(mensajeError != null){
        mensajeError.remove();
    }
}

// Añadir fechas al select de los años

document.addEventListener("DOMContentLoaded", () => {
    const fecha = new Date().getFullYear();
    for(let contador = fecha; contador >= fecha - 20; contador--){
        const option = document.createElement('option');
        option.textContent = contador;
        option.value = contador;
        years.appendChild(option);
    }
})