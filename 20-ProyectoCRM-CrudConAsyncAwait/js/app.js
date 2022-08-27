import {CogerClientes, EliminarCliente} from "./API.js";


document.addEventListener("DOMContentLoaded", MostrarClientes)

async function MostrarClientes()
{
    const tbody = document.querySelector("tbody");
    let response = await CogerClientes();

    response.forEach(element => {
        tbody.innerHTML += `
            <tr id="${element.id}">
                <td>${element.nombre}</td>
                <td>${element.email}</td>
                <td>${element.telefono}</td>
                <td>${element.empresa}</td>
                <td><button id="eliminar">Eliminar</button><button id="editar">Editar</button></td>
            </tr>
        `
    });
}

const tbody = document.querySelector("tbody");
tbody.addEventListener("click", e => {
    if(e.target.id == "eliminar")
    {
        EliminarCliente(e.target.parentElement.parentElement.id)
    }
    else{
        if(e.target.id == "editar")
        {
            window.location.href = "edit-cliente.html?id=" + e.target.parentElement.parentElement.id
        }
    }
})