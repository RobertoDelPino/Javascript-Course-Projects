import {ListaPacientes} from "./listaPacientes.js"


const formulario = document.querySelector('form');
const seccionCitas = document.querySelector('.ListaCitas');
const inputNombre = document.querySelector('#nombre');
const inputPropietario = document.querySelector('#propietario');
const inputTelefono = document.querySelector('#telefono');
const inputFecha = document.querySelector('#fecha');
const inputHora = document.querySelector('#hora');
const inputSintomas = document.querySelector('#sintomas');
let nombre,propietario,telefono,fecha,hora,sintomas;
let listaPacientes = new ListaPacientes();

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
                if(listaPacientes.ComprobarForm()){
                    listaPacientes.ActualizarPaciente();
                    formulario.reset();
                }; 
            }
            else{
                if(listaPacientes.ComprobarForm()){
                    listaPacientes.AgregarPaciente();
                }; 
            }
        }
    })

    seccionCitas.addEventListener('click', e =>{
        e.preventDefault();
        if(e.target.classList.contains("eliminar"))
        {
            listaPacientes.EliminarPaciente(e.target.parentElement.parentElement.id);
        }
        else{
            if(e.target.classList.contains("editar"))
            {
                listaPacientes.EditarPaciente(e.target.parentElement.parentElement.id)
            }
        }
    })

    // addEventListener para cada campo

    inputNombre.addEventListener('change', e => {
        nombre = e.target.value;
    })

    inputPropietario.addEventListener('change', e => {
        propietario = e.target.value;
    })

    inputTelefono.addEventListener('change', e => {
        telefono = e.target.value;
    })

    inputFecha.addEventListener('change', e => {
        fecha = e.target.value;
    })

    inputHora.addEventListener('change', e => {
        hora = e.target.value;
    })

    inputSintomas.addEventListener('change', e => {
        sintomas = e.target.value;
    })
}

