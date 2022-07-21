import {Paciente} from "./Paciente.js";

const formulario = document.querySelector('form');
const inputNombre = document.querySelector('#nombre');
const inputPropietario = document.querySelector('#propietario');
const inputTelefono = document.querySelector('#telefono');
const inputFecha = document.querySelector('#fecha');
const inputHora = document.querySelector('#hora');
const inputSintomas = document.querySelector('#sintomas');

let DB;

export function crearDB()
{
    // Crear o abrir la base de datos
    let crear = window.indexedDB.open("dbDatos",1);
    crear.onsuccess = () => {
        console.log("Se ha creado correctamente");
        DB = crear.result;
        MostrarTodasLasCitas();
    }

    // Crear las columnas/tablas

    crear.onupgradeneeded = function(e){
        let db = e.target.result;

        let objectStore = db.createObjectStore('dbDatos', { keyPath: 'id',  autoIncrement: true } );

        objectStore.createIndex('nombre', 'nombre', { unique: false } );
        objectStore.createIndex('propietario', 'propietario', { unique: false } );
        objectStore.createIndex('telefono', 'telefono', { unique: false } );
        objectStore.createIndex('fecha', 'fecha', { unique: false } );
        objectStore.createIndex('hora', 'hora', { unique: false } );
        objectStore.createIndex('sintomas', 'sintomas', { unique: false } );
    }
}
    
export function agregarPaciente(nombre, propietario, telefono, fecha, hora, sintomas)
{
    let transaction = DB.transaction(["dbDatos"], 'readwrite');
    let objectStore = transaction.objectStore("dbDatos");
    let paciente = new Paciente(nombre, propietario, telefono, fecha, hora, sintomas);
    objectStore.add(paciente);
}

export function MostrarTodasLasCitas()
{
    EliminarTodasLasCitas();
    var lista = CogerTodosLosDatos();
    lista.openCursor().onsuccess = function(event) 
    {
        var cursor = event.target.result;
        if (cursor)
        {
            const li = document.createElement('li');
            li.innerHTML = `
                <h4>${cursor.value.nombre}</h4>
                <p>Propietario: <span>${cursor.value.propietario}</span></p>
                <p>Teléfono: <span>${cursor.value.telefono}</span></p>
                <p>Fecha: <span>${cursor.value.fecha}</span></p>
                <p>Hora: <span>${cursor.value.hora}</span></p>
                <p>Síntomas: <span>${cursor.value.sintomas}</span></p>
                <div class="btn-Cita">
                    <input class="eliminar" type="button" value="Eliminar">
                    <input class="editar" type="button" value="Editar">
                </div>
            `;
            li.id = cursor.value.id;
            const citas = document.querySelector('ul');
            citas.appendChild(li);

            cursor.continue();
        }
    }
}

function CogerTodosLosDatos()
{
    var transaction = DB.transaction("dbDatos", "readwrite");
    var objectStore = transaction.objectStore("dbDatos");

    return objectStore;
}

export function EliminarCita(id)
{
    var lista = CogerTodosLosDatos();
    lista.openCursor().onsuccess = function(event)
    {
        var cursor = event.target.result;
        if(cursor.value.id == id){
            return lista.delete(cursor.primaryKey);
        }
        cursor.continue();
    }
    EliminarTodasLasCitas();
    MostrarTodasLasCitas();
}

function EliminarTodasLasCitas()
{
    const listaCitas = document.querySelectorAll('li');
    listaCitas.forEach(element =>{
        element.remove();
    });
}


export function EditarCita(id)
{
    const btnEnviar = document.querySelector('.btn-Enviar');
    btnEnviar.value = "ACTUALIZAR CITA";

    var lista = CogerTodosLosDatos();
    lista.openCursor().onsuccess = function(event)
    {
        var cursor = event.target.result;
        if(cursor.value.id == id){

            inputNombre.value = cursor.value.nombre;
            inputPropietario.value = cursor.value.propietario;
            inputTelefono.value = cursor.value.telefono;
            inputFecha.value = cursor.value.fecha;
            inputHora.value = cursor.value.hora;
            inputSintomas.value = cursor.value.sintomas;
            btnEnviar.id = id;

            return;
        }
        cursor.continue();
    }
}

export function ActualizarCita()
{
    const btnEnviar = document.querySelector('.btn-Enviar');
    var lista = CogerTodosLosDatos();
    let paciente = new Paciente(inputNombre.value, inputPropietario.value, inputTelefono.value, inputFecha.value, inputHora.value, inputSintomas.value);
    paciente.id = btnEnviar.id;
    lista.put(paciente)

    EliminarTodasLasCitas();
    MostrarTodasLasCitas();
    formulario.reset();
}