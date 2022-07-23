import { MostrarTodosLosCLientes } from "./database.js";

const h5 = document.querySelector("h5");

window.setTimeout((MostrarTodosLosCLientes),50);
setTimeout(() => {
    const tr = document.querySelectorAll("tbody tr");
    h5.innerText = "Hay " + tr.length + " Clientes"
},70);
