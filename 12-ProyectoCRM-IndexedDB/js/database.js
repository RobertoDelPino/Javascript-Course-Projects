let DB;

// Crear la base de datos

function CrearAbrirBD()
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

        let objectStore = database.createObjectStore('crm', {KeyPath: 'crm'});

        objectStore.createIndex('nombre','nombre', {unique: false});
        objectStore.createIndex('telefono','telefono', {unique: true});
        objectStore.createIndex('empresa','empresa', {unique: false});
    }

}

// Resto de funciones:

// - Mostrar clientes
// - Eliminar cliente
// - Editar cliente
// - Eliminar todos los clientes del HTML
// - Agregar cliente

