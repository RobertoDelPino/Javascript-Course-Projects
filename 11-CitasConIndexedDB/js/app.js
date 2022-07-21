import {crearDB, agregarPaciente, EliminarCita, EditarCita, ActualizarCita} from "./database.js";

const formulario = document.querySelector('form');
const seccionCitas = document.querySelector('.ListaCitas');
const inputNombre = document.querySelector('#nombre');
const inputPropietario = document.querySelector('#propietario');
const inputTelefono = document.querySelector('#telefono');
const inputFecha = document.querySelector('#fecha');
const inputHora = document.querySelector('#hora');
const inputSintomas = document.querySelector('#sintomas');

// Agregar los Event Listeners
agregarEventListener();

function agregarEventListener()
{
    formulario.addEventListener('click', e =>{
        e.preventDefault();
        if(e.target.classList.contains("btn-Enviar"))
        {
            if(e.target.value == "ACTUALIZAR CITA")
            {
                e.target.value = "CREAR CITA"
                if(ComprobarForm()){
                    ActualizarCita();
                }; 
            }
            else{
                if(ComprobarForm()){
                    agregarPaciente(inputNombre.value, inputPropietario.value, inputTelefono.value, inputFecha.value, inputHora.value, inputSintomas.value);
                    formulario.reset();
                    location.reload();
                }; 
            }
        }
    })

    seccionCitas.addEventListener('click', e =>{
        e.preventDefault();
        if(e.target.classList.contains("eliminar"))
        {
            EliminarCita(e.target.parentElement.parentElement.id);
        }
        else{
            if(e.target.classList.contains("editar"))
            {
                EditarCita(e.target.parentElement.parentElement.id)
            }
        }
    })

    document.addEventListener('DOMContentLoaded', () =>{
        crearDB();
    })
}

function ComprobarForm()
{
    let correcto;
    if(inputNombre.value != "" && inputPropietario.value != "" && inputTelefono.value != "" && inputFecha.value != "" && inputHora.value != "" && inputSintomas.value != "")
    {
        correcto = true;
    }
    else
    {
        correcto = false;
        this.MostrarError("Todos los campos son obligatorios.");
        return correcto;
    }

    if(inputNombre.value != undefined && inputPropietario.value != undefined && inputTelefono.value != undefined && inputFecha.value != undefined && inputHora.value != undefined && inputSintomas.value != undefined)
    {
        correcto = true;
    }
    else
    {
        correcto = false;
        this.MostrarError("Todos los campos son obligatorios.")
        return correcto;
    }
    return correcto;
}
