import {ObtenerCliente, EditarCliente} from "./API.js"

document.addEventListener("DOMContentLoaded", async () => {
    const cliente = await ObtenerDatos();
    AgregarDatosCliente(cliente);
})

const btnEnviar = document.querySelector("#btnEnviar");
btnEnviar.addEventListener("click", e => {
    e.preventDefault();
    GuardarDatosCliente();
})

// Obtener datos del cliente
async function ObtenerDatos() 
{
    const parametros = new URLSearchParams(window.location.search);
    return await ObtenerCliente(parametros.get("id"))
}

// Introducir la información del cliente en el formulario
function AgregarDatosCliente(cliente) 
{
    document.querySelector("#nombre").value = cliente.nombre;
    document.querySelector("#email").value = cliente.email;
    document.querySelector("#telefono").value = cliente.telefono;
    document.querySelector("#empresa").value = cliente.empresa;
}

function GuardarDatosCliente() 
{
    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const telefono = document.querySelector("#telefono").value;
    const empresa = document.querySelector("#empresa").value;

    let cliente = {
        nombre,
        email,
        telefono,
        empresa,
    }

    EditarCliente(cliente);
}