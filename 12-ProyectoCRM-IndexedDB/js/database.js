export let DB;

// Crear la base de datos

export function CrearAbrirBD()
{
    // coDB = create open database
    let coDB = window.indexedDB.open('listClientes',1);

    coDB.onerror = () => {
        console.log("Ha ocurrido un error al cargar la base de datos");
    }

    // Guardar la base de datos en una variable global
    coDB.onsuccess = () => {
        DB = coDB.result;
    }

    // Crear las columnas de la tabla
    coDB.onupgradeneeded = (e) => {
        let database = e.target.result;

        let objectStore = database.createObjectStore('listClientes', {keyPath: 'id', autoIncrement : true});

        objectStore.createIndex('nombre','nombre', {unique: false});
        objectStore.createIndex('telefono','telefono', {unique: true});
        objectStore.createIndex('empresa','empresa', {unique: false});
        objectStore.createIndex('id','id', {unique: true});
    }
}



// Resto de funciones:

// - Coger todos los datos de la db

function CogerDatos()
{
    let transaction = DB.transaction('listClientes', 'readwrite');
    let objectStore = transaction.objectStore('listClientes');
    return objectStore;
}

// - Agregar cliente

export function AgregarCliente(nombre,correo,telefono,empresa)
{
    var datos = CogerDatos();
    let cliente = {
        id : Math.floor(Math.random() * 1000000),
        nombre : nombre,
        correo : correo,
        telefono : telefono,
        empresa : empresa
    };

    datos.add(cliente);
    setTimeout(() => {
        let url = location.href.replace("Nuevo-Cliente","Index");
        location.href = url ;
    }, 1000)
}

// - Mostrar clientes

export function MostrarTodosLosCLientes()
{
    EliminarTodoLosClientesHTML();
    var datos = CogerDatos();
    datos.openCursor().onsuccess = function(event)
    {
        var elemento = event.target.result;
        if(elemento)
        {
            let tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${elemento.value.nombre}</td>
            <td>${elemento.value.correo}</td>
            <td>${elemento.value.telefono}</td>
            <td>${elemento.value.empresa}</td>
            <td><button id="eliminar">Eliminar</button><button id="editar">Editar</button></td>
            `;
            tr.id = elemento.value.id;

            const tbody = document.querySelector("tbody");
            tbody.appendChild(tr);

            elemento.continue();
        }
    }
}

// - Eliminar cliente

export function EliminarCliente(id)
{
    let datos = CogerDatos();
    datos.delete(Number(id));
}

// - Editar cliente

export function EditarCliente()
{
    const parametroURL = new URLSearchParams(window.location.search);
    let id = parametroURL.get("id");
    let datos = CogerDatos().get(Number(id));
    datos.onsuccess = function(event)
    {
        nombre.value = event.target.result.nombre;
        telefono.value = event.target.result.telefono;
        correo.value = event.target.result.correo;
        empresa.value = event.target.result.empresa;
    }
}

export function ActualizarCliente(id, nombre, correo, telefono, empresa)
{
    var datos = CogerDatos();
    datos.delete(Number(id));
    let cliente = {
        id : id,
        nombre : nombre,
        correo : correo,
        telefono : telefono,
        empresa : empresa
    };

    datos.add(cliente);
    setTimeout(() => {
        let url = location.href.replace("Nuevo-Cliente","Index");
        location.href = url ;
    }, 1000)
}

// - Eliminar todos los clientes del HTML

function EliminarTodoLosClientesHTML()
{
    const tbody = document.querySelector("tbody")
    const tr = document.querySelectorAll("tbody tr");
    tr.forEach((element) => {
        tbody.removeChild(element);
    })
}

