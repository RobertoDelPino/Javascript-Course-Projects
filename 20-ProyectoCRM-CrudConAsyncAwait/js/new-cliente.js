// 1. Validar datos
// 2. Enviar datos

import { Validar } from './funciones.js'
import { AgregarCliente } from './API.js'

const btnEnviar = document.querySelector("#btnEnviar");
btnEnviar.addEventListener("click", e => {
    e.preventDefault();
    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const telefono = document.querySelector("#telefono").value;
    const empresa = document.querySelector("#empresa").value;

    let cliente = {
        nombre,
        email,
        telefono,
        empresa
    }

    if(Validar(cliente))
    {
        AgregarCliente(cliente);
    }
});

