let cliente = {
    mesa:'',
    hora:'',
    pedido:[],
    propina:'',
    precioFinal:''
}

let platos = "";

function Comida(nombre,precio,categoria,cantidad){
    this.nombre = nombre;
    this.precio =  precio;
    this.categoria = categoria;
    this.cantidad = cantidad;
}

document.addEventListener("DOMContentLoaded",CargarEventListenner());

function CargarEventListenner()
{
    // BOTONES PARA ABRIR FORM NUEVA ORDEN
    const btnNuevaOrden = document.querySelector(".btnNuevaOrden");
    btnNuevaOrden.addEventListener("click", OcultarNuevaOrden);
    
    // BOTONES PARA CERRAR FORM NUEVA ORDEN
    const btnCerrarNuevaOrden = document.querySelector(".cajaForm div p");
    btnCerrarNuevaOrden.addEventListener("click", OcultarNuevaOrden);
    
    const btnCerrar = document.querySelector("#btnCerrar");
    btnCerrar.addEventListener("click", e => {
        e.preventDefault();
        OcultarNuevaOrden();
    });

    const btnAgregarOrden = document.querySelector("#btnAgregarOrden");
    btnAgregarOrden.addEventListener("click", e => {
        e.preventDefault();
        AgregarInformacion();
    });

    const propina = document.querySelectorAll("#propina");
    // Poner el evento
    propina.forEach(input => {
        input.onchange = MostrarPrecio;
    })

    // Eliminar un pedido del apartado de "Resumen de platos"
    const cajaResumen = document.querySelector(".resumenPlatos");
    cajaResumen.addEventListener("click", e => {
        if(e.target.id == "eliminar")
        {
            console.log(e.target.parentElement.id)
            EliminarPedido(e.target.parentElement.id);
        }
    })

}

function OcultarNuevaOrden()
{
    const cajaForm = document.querySelector(".cajaForm");
    const btnNuevaOrden = document.querySelector(".btnNuevaOrden");
    if(cajaForm.classList.contains("invisible")){
        cajaForm.classList = "cajaForm";
        btnNuevaOrden.classList = "btnNuevaOrden invisible";
    }
    else{
        cajaForm.classList = "cajaForm invisible";
        btnNuevaOrden.classList = "btnNuevaOrden";
    }
}

function AgregarInformacion()
{
    const mesa = document.querySelector("#mesa").value;
    const hora = document.querySelector("#hora").value;

    let comprobacion = [mesa, hora].some(campo => campo === "");

    if(comprobacion)
    {
        console.log("Algun campo se encuentra vacio");
    }
    else{
        console.log("Todos los campos estan correctos");
        cliente.hora = hora;
        cliente.mesa = mesa;
        cliente.pedido = [];
        OcultarNuevaOrden();
        MostrarSecciones();
        ObtenerPlatos();
        MostrarPedido();
        MostrarPrecio();    

        // Falta reiniciar el formulario
    }
}

function MostrarSecciones()
{
    const platos = document.querySelector(".platillos");
    platos.classList = "caja platillos";
    const resumen = document.querySelector(".resumen");
    resumen.classList = "caja resumen";
    
    const mesaHora = document.querySelector(".mesaHora");
    mesaHora.textContent = "Mesa " + cliente.mesa + " | Hora: " + cliente.hora
}

function ObtenerPlatos()
{
    let link = "http://localhost:3000/platillos"

    fetch(link)
        .then(resultado => {
            return resultado.json();
        })
        .then(objeto => {
            platos = objeto;
            MostrarResultados(objeto);
            // Cargar AddEventListener a los input para la cantidad
            CantidadEventListener();
        })
}

function CantidadEventListener()
{
    const cantidad = document.querySelectorAll("#cantidad");
    // Poner el evento
    cantidad.forEach(input => {
        input.onchange = function()
        {
            let id = input.classList.value - 1;
            let indice = cliente.pedido.findIndex(campo => campo.nombre == platos[id].nombre);
            let cantidad = input.value;

            if(indice != -1)
            {
                if(cantidad == 0)
                {
                    cliente.pedido.splice(indice,1);
                }
                else
                {
                    cliente.pedido[indice].cantidad = cantidad;
                }
            }
            else
            {
                cliente.pedido.push(new Comida(platos[id].nombre, platos[id].precio, platos[id].categoria,cantidad))
            }

            // Despues de añadir el pedido o la actualización del pedido
            // debemos volver a mostrar todo el contenido del array en pantalla
            MostrarPedido();
            MostrarPrecio();
        }
    })
}

function MostrarPedido()
{
    const cajaResumen = document.querySelector(".resumenPlatos");
    cajaResumen.innerHTML = "";
    let contador = 0;
    cliente.pedido.forEach( pedido => {
        cajaResumen.innerHTML += `
            <div id="${contador}">
                <h3>${pedido.nombre}</h3>
                <p>Cantidad: ${pedido.cantidad}</p>
                <p>Precio: ${pedido.precio}</p>
                <p>Subtotal: ${pedido.cantidad * pedido.precio}</p>
                <button id="eliminar">Eliminar pedido</button>
            </div>
        `;
    })
}

function MostrarPrecio()
{
    const totalPrecio = document.querySelector(".totalPrecio");
    const totalPropina = document.querySelector(".totalPropina");
    cliente.propina = document.querySelector('input[name=propina]:checked').classList;

    cliente.precioFinal = 0;
    cliente.pedido.forEach(pedido => {
        cliente.precioFinal += pedido.cantidad * pedido.precio;
    })

    totalPrecio.textContent = "Total: " + cliente.precioFinal + "€";
    totalPropina.textContent = "Total con propina: " + (cliente.precioFinal + (cliente.precioFinal * (parseInt(cliente.propina) / 100))) + "€";
}

function EliminarPedido(id)
{
    cliente.pedido.splice(id,1);
    MostrarPedido();
    MostrarPrecio();
}

function MostrarResultados(informacion)
{
    const platillos = document.querySelector(".platillos table tbody")
    informacion.forEach(element => {
        let categoria = "";
        switch(element.categoria){
            case 1: categoria = "Comidas"; break;
            case 2: categoria = "Bebidas"; break;
            case 3: categoria = "Postres"; break;
        }
        platillos.innerHTML += 
        `
            <tr>
                <td>${element.nombre}</td>
                <td>${element.precio}€</td>
                <td>${categoria}</td>
                <td>
                    <input type="number" id="cantidad" class="${element.id}" value="0" min="0">
                </td>
            </tr>
        `
    });
};