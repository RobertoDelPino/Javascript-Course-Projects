// En este archivo se encontrarían todas las funciones
// que se utilizarían para:
// 1. Agregar clientes
// 2. Eliminar clientes
// 3. Editar clientes
// 4. Coger todos los clientes

let link = "http://localhost:3000/clientes"

export async function AgregarCliente(cliente)
{
    try{
        await fetch(link, {
            method: 'POST',
            body: JSON.stringify(cliente),
            headers:{
                'Content-Type':'application/json'
            }
        })
        window.location.href = "Index.html"
    }
    catch (error){
        console.log(error)
    }
}

export async function CogerClientes()
{
    try{
        let response = await fetch(link, {
            method:'GET'
        })
       return await response.json();
    }
    catch (error){
        console.log(error)
    }
}

export async function EliminarCliente(id)
{
    link += "/" + id;
    try{
        let response = await fetch(link, {
            method:'DELETE'
        })
       return await response.json();
    }
    catch (error){
        console.log(error)
    }
}

export async function ObtenerCliente(id)
{
    link += "/" + id;
    try{
        let response = await fetch(link, {
            method:'GET'
        })
       return await response.json();
    }
    catch (error){
        console.log(error)
    }
}

export async function EditarCliente(cliente)
{
    try{
        await fetch(link, {
            method: 'PUT',
            body: JSON.stringify(cliente),
            headers:{
                'Content-Type':'application/json'
            }
        })
        window.location.href = "Index.html"
    }
    catch (error){
        console.log(error)
    }
}