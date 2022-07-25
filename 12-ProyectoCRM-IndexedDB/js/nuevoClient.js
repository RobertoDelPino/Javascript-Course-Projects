import { EditarCliente, ActualizarCliente, AgregarCliente } from "./database.js";

const formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const telefono = document.querySelector("#telefono");
const correo = document.querySelector("#correo");
const empresa = document.querySelector("#empresa");
const btnEnviar = document.querySelector("#btnEnviar");

añadirEventListener();

function añadirEventListener()
{
    if(window.location.search != "")
    {
        const parametroURL = new URLSearchParams(window.location.search);
        let id = parametroURL.get("id");
        btnEnviar.value = "ACTUALIZAR CLIENTE";
        setTimeout(EditarCliente,30);
        formulario.addEventListener('click', (e) => {
            if(e.target.id == "btnEnviar")
            {
                e.preventDefault();
                if(ComprobarForm)
                {
                    ActualizarCliente(Number(id),nombre.value, correo.value ,telefono.value, empresa.value);
                }
            }
        })
    }
    else{
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
}

// Comprobar form

function ComprobarForm()
{
    return true;
}