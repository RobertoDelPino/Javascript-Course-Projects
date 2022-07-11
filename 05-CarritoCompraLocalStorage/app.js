// Objeto de producto
function Producto(nombre){
    this.name = nombre;
    this.cantidad = 1;
}

const carritoCompra = document.querySelector('.carritoCompra');
const seccionCompra = document.querySelector('.CajaCompra');
const carrito = document.querySelector('.carrito');




let arrayCompra = [];
let products = localStorage.getItem('productos');
if( products != null)
{
    arrayCompra = JSON.parse(products);
    localStorage.setItem("productos",JSON.stringify( arrayCompra ));
    VisualizarProductos();
}








carritoCompra.addEventListener('click', () =>{
    if (carrito.classList.contains('activo'))
    {
        carrito.classList.remove('activo');
        seccionCompra.classList.remove('activo');

    }
    else
    {
        carrito.classList.add('activo');
        seccionCompra.classList.add('activo');
    }
});

// Boton agregar al carrito

const listaCursos = document.querySelectorAll('.numero');
for(let contador = 0; contador < listaCursos.length; contador++){
    listaCursos[contador].addEventListener('click', () => {
        AgregarCarrito(listaCursos[contador].innerText);
    })
}

function BuscarPosicion(nombre){
    let posicion = 0;
    let final = false;
    while (!final)
    {
        if (arrayCompra[posicion].name == nombre)
        {
            // console.log("encontrado " + posicion + " " + arrayCompra[posicion].name);
            final = true;
        }
        else{
            if(posicion === arrayCompra.length - 1){
                final = true;
                posicion = -1;
            }
            else{
                posicion++;
            }
        }
    }
    return posicion
}

function AgregarCarrito(producto){
    if (arrayCompra.length > 0){
        const posicion = BuscarPosicion(producto);
        if (posicion == -1){
            arrayCompra.push(new Producto(producto));
            localStorage.setItem("productos",JSON.stringify( arrayCompra ));
            VisualizarProductos();
        }
        else{
            arrayCompra[posicion].cantidad++;
            localStorage.setItem("productos",JSON.stringify( arrayCompra ));
            VisualizarProductos();
        }
    }
    else{
        arrayCompra.push(new Producto(producto));
        localStorage.setItem("productos",JSON.stringify( arrayCompra ));
        VisualizarProductos();
    }
}

// Eliminar todo el contenido del tbody

function EliminarContenidoTbody()
{
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = "";
}

// Event eliminar un producto
function AñadirEventEliminar()
{
    const botonEliminar = document.querySelectorAll('.eliminarProducto');
    for(let contador = 0; contador < botonEliminar.length; contador++){
        botonEliminar[contador].addEventListener('click', EliminarProducto)
    }
}

// Eliminar un producto

function EliminarProducto()
{
    arrayCompra.splice(this.id,1);
    localStorage.setItem("productos",JSON.stringify( arrayCompra ));
    VisualizarProductos();
}

// Crear los elementos para ponerlos en la tabla de la compra 

function VisualizarProductos()
{
    let productos = JSON.parse( localStorage.getItem('productos'));
    if(productos != null)
    {
        EliminarContenidoTbody();
        for(let contador = 0; contador <= productos.length - 1; contador++)
        {
            const tr = document.createElement('tr');
    
            tr.innerHTML = `
                <td>${productos[contador].name}</td>
                <td>${productos[contador].cantidad} </td>
                <td>
                    <a href="#" class="eliminarProducto" id="${contador}">
                        <img class="imgEliminar" src="images/eliminar.png">
                    </a>
                </td>
            `
            // Insertarlo en el HTML
            const contenedor = document.querySelector('.cajaDeTodasLasVentas');
            contenedor.appendChild(tr);
        };
        AñadirEventEliminar();
    }
};

// Eliminar todos los productos 

const botonEliminarTodos = document.querySelector('.botonEliminarTodos');
botonEliminarTodos.addEventListener('click', () =>{
    arrayCompra.splice(0, arrayCompra.length);
    EliminarContenidoTbody();
    localStorage.clear();
    VisualizarProductos();
});


