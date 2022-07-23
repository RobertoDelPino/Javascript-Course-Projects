import { AgregarCliente } from "./database.js";

const formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const telefono = document.querySelector("#telefono");
const correo = document.querySelector("#correo");


añadirEventListener();

function añadirEventListener()
{
    formulario.addEventListener('click', (e) => {
        if(e.target.id == "btnEnviar")
        {
            e.preventDefault();
            if(ComprobarForm)
            {
                AgregarCliente(nombre.value, correo.value ,telefono.value, empresa.value);
            }
        }
    })
}

// Comprobar form

function ComprobarForm()
{
    return true;
}