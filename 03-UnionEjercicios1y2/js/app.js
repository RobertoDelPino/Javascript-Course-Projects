const boton = document.querySelector('.editar');
const secAniadir = document.querySelector('.sec-Añadir');
const textoEditar = document.querySelector('.btn-EditarProductos');
const form = document.querySelector('.formularioAñadir');
const listaProductos = document.querySelector('.productos');
const body = document.querySelector('body');
const btnAgregar = document.querySelector('.btn-Agregar');
const btnLimpiar = document.querySelector('.btn-Limpiar');
const secNuevosProductos = document.querySelector('.NuevosProductos');
let contador = 0;

boton.addEventListener('click', () =>{
    if(secAniadir.classList.contains('desactivado')){
        secAniadir.classList.remove('desactivado');
        textoEditar.textContent = "Cerrar X";
        ocultarBtnEliminar();
    }
    else{
        secAniadir.classList.add('desactivado');
        textoEditar.textContent = "Editar Productos";
        form.reset();
        mostrarBtnEliminar();
        
    };
});

/* Eliminar productos */

listaProductos.addEventListener('click',eliminarProductos);

/* Mostrar y ocultar botones de eliminar */

function mostrarBtnEliminar()
{
    const productos = document.querySelectorAll('.eliminar')
    console.log(productos);
    for(let contador = 0; contador < productos.length; contador++)
    {
        productos[contador].classList.add('El-desactivado');
    }
}

function ocultarBtnEliminar()
{
    const productos = document.querySelectorAll('.eliminar')
    for(let contador = 0; contador < productos.length; contador++)
    {
        productos[contador].classList.remove('El-desactivado');
    }
}

/* Limpiar formulario */

btnLimpiar.addEventListener('click', e => {
    e.preventDefault();
    form.reset();
});

/* Introducir nuevos productos*/

// Boton añadir producto
btnAgregar.addEventListener('click',añadirProducto);

document.addEventListener('DOMContentLoaded', () => {
    btnAgregar.disabled = true;
    btnAgregar.classList.add('desactivado');
})

// texto del formulario

const nombre = document.querySelector('#nombre');
const precio = document.querySelector('#precio');
const descripcion = document.querySelector('#descripcion');

nombre.addEventListener('blur',comprobarInformacion);
precio.addEventListener('blur',comprobarInformacion);
descripcion.addEventListener('blur',comprobarInformacion);

function comprobarInformacion()
{
    // Falta añadir comprobación de precio
    // y comprobar que el nombre del producto
    // no sea kilométrico

    if(nombre.value != "" && precio.value != "" && descripcion.value != "")
    {
        btnAgregar.classList.remove('desactivado');
        btnAgregar.disabled = false;
    }
    else
    {
        btnAgregar.classList.add('desactivado');
        btnAgregar.disabled = true;
    }
}

function añadirProducto(e)
{
    e.preventDefault();
    const div = document.createElement('div');
    div.innerHTML = `
        <div class='caja-Eliminar'><p class='eliminar'>X</p></div>
        <h4>${nombre.value}</h4>
        <p>${precio.value}</p>
        <p>${descripcion.value}</p>
    `;
    div.classList.add('producto');
    div.id = contador;
    contador = listaProductos.childNodes.length + 1;
    listaProductos.append(div);
}

function eliminarProductos(e)
{
    if (e.target.classList.contains('eliminar'))
    {
        let contador = 0;
        let final = false;
        while (!final)
        {
            if(e.target.parentElement.parentElement.id == listaProductos.childNodes[contador].id)
            {
                listaProductos.removeChild(listaProductos.childNodes[contador]);
                final = true;
            }
            else
            {
                if(contador === listaProductos.childNodes.length - 1)
                {
                    final = true;
                    console.log("adios");
                }
                else
                {
                    contador++;
                }
            }
        }
    }
}