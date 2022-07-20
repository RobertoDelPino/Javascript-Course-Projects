import { Paciente } from "./Paciente.js";
const formulario = document.querySelector('form');
const inputNombre = document.querySelector('#nombre');
const inputPropietario = document.querySelector('#propietario');
const inputTelefono = document.querySelector('#telefono');
const inputFecha = document.querySelector('#fecha');
const inputHora = document.querySelector('#hora');
const inputSintomas = document.querySelector('#sintomas');
export class ListaPacientes{
    constructor()
    {
        this.lista = [];
    }

    // Funciones:

    // Comprobar formulario

    ComprobarForm()
    {
        let correcto = false;
        if(nombre != "" && propietario != "" && telefono != "" && fecha != "" && hora != "" && sintomas != "")
        {
            correcto = true;
        }
        else
        {
            correcto = false;
            this.MostrarError("Todos los campos son obligatorios.");
            return correcto;
        }

        if(nombre != undefined && propietario != undefined && telefono != undefined && fecha != undefined && hora != undefined && sintomas != undefined)
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

    // Agregar Paciente

    AgregarPaciente()
    {
        this.lista.push(new Paciente(nombre.value,propietario.value,telefono.value,fecha.value,hora.value,sintomas.value));
        this.EliminarTodosLasCitas();
        this.MostrarPacientes();
        formulario.reset();
    }

    // Eliminar Paciente --> usar la funcion filter

    EliminarPaciente(id)
    {
        this.lista = this.lista.filter(paciente => paciente.id != id);
        this.EliminarTodosLasCitas();
        this.MostrarPacientes();
    }

    // Eliminar todos los pacientes del html

    EliminarTodosLasCitas()
    {
        const listaCitas = document.querySelectorAll('li');
        listaCitas.forEach(element =>{
            element.remove();
        });
    }

    // Editar Paciente

    EditarPaciente(id){
        let result = this.lista.filter(paciente => paciente.id == id);
        inputNombre.value = result[0].nombre;
        inputPropietario.value = result[0].propietario;
        inputTelefono.value = result[0].telefono;
        inputFecha.value = result[0].fecha;
        inputHora.value = result[0].hora;
        inputSintomas.value = result[0].sintomas;

        const btnEnviar = document.querySelector('.btn-Enviar');
        btnEnviar.value = "ACTUALIZAR CITA";
        btnEnviar.id = id;
    }

    // Actualizar Paciente

    ActualizarPaciente()
    {
        const btnEnviar = document.querySelector('.btn-Enviar');

        let result = this.lista.findIndex(paciente => paciente.id == btnEnviar.id);
        this.lista[result].nombre = inputNombre.value;
        this.lista[result].propietario = inputPropietario.value;
        this.lista[result].hora = inputHora.value;
        this.lista[result].fecha = inputFecha.value;
        this.lista[result].sintomas = inputSintomas.value;
        this.lista[result].telefono = inputTelefono.value;

        this.EliminarTodosLasCitas();
        this.MostrarPacientes();
    }

    // Mostrar Pacientes

    MostrarPacientes()
    {
        this.lista.forEach(paciente => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h4>${paciente.nombre}</h4>
                <p>Propietario: <span>${paciente.propietario}</span></p>
                <p>Teléfono: <span>${paciente.telefono}</span></p>
                <p>Fecha: <span>${paciente.fecha}</span></p>
                <p>Hora: <span>${paciente.hora}</span></p>
                <p>Síntomas: <span>${paciente.sintomas}</span></p>
                <div class="btn-Cita">
                    <input class="eliminar" type="button" value="Eliminar">
                    <input class="editar" type="button" value="Editar">
                </div>
            `;
            li.id = paciente.id;
            const citas = document.querySelector('ul');
            citas.appendChild(li);
        })
    }

    // Mostrar Mensaje de error

    MostrarError(mensaje) {
        const cajaForm = document.querySelector('.cajaFormulario');
        const div = document.createElement('p');
        div.textContent = "Error! " + mensaje;
        div.classList.add('error');
        cajaForm.insertBefore(div,formulario);
        setTimeout( () =>  {
            document.querySelector('.error').remove();
        }, 2100);
    }
}
