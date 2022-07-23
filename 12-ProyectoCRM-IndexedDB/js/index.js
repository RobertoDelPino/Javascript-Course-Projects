import { EditarCliente, EliminarCliente, MostrarTodosLosCLientes } from "./database.js";

const h5 = document.querySelector("h5");
const tbody = document.querySelector("tbody");

window.setTimeout((MostrarTodosLosCLientes),50);
ContarClientes();

añadirEventListener();

function añadirEventListener()
{
    tbody.addEventListener("click", (e) =>{
        if(e.target.id == "eliminar"){
            EliminarCliente(e.target.parentElement.parentElement.id);
            MostrarTodosLosCLientes();
            ContarClientes();
        }
        else{
            if(e.target.id == "editar"){
                let url = location.href.replace("Index","Nuevo-Cliente");
                location.href = url ;

                // Falta editar el cliente, que no se me ocurre ahora mismo nada
                // EditarCliente(e.target.parentElement.parentElement.id);
            }
        }
    })
}

function ContarClientes(){
    setTimeout(() => {
        const tr = document.querySelectorAll("tbody tr");
        h5.innerText = "Hay " + tr.length + " Cliente/s"
    },70);
}


