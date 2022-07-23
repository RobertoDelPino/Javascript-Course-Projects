import { CrearAbrirBD } from "./database.js";

const parteIzq = document.querySelector(".parteIzq");

añadirEventListener();

function añadirEventListener()
{
    document.addEventListener("DOMContentLoaded", () =>{
        CrearAbrirBD();
        let div = document.createElement("div");
        div.innerHTML = `
            <h1>CRM - INDEXEDDB</h1>
            <p>Administra tus Clientes con el CRM - IndexedDB</p>
            <div>
                <a href="Index.html">Clientes</a>
                <a href="Nuevo-Cliente.html">Nuevo Cliente</a>
            </div>
        `
        parteIzq.appendChild(div);
    })
}