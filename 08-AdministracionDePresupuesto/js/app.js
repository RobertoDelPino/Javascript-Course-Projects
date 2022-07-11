class ListaGastos{
    constructor(){
        this.presupuesto = this.pedirPresupuesto();
        this.listaGastos = [];
        this.restante = this.presupuesto;
    }

    // Pedir Presupuesto

    pedirPresupuesto(){
        let cantidad;
        let final = false;
        while(!final)
        {
            cantidad = parseInt(prompt('Indica el presupuesto inicial'));
            if(Number.isInteger(cantidad))
            {
                if(cantidad <= 0)
                {
                    cantidad = 0;
                    alert('La cantidad a introducir debe de ser mayor que 0');
                }
                else
                {
                    final = true;
                }
            }
            else{
                cantidad = 0;
                alert('La cantidad debe de ser un número');
            }
        }
        return cantidad;
    }    

    // Agregar gasto 

    AgregarGasto()
    {
        const nombre = document.querySelector('#nombre').value;
        const precio = parseFloat(document.querySelector('#precio').value);
        this.restante = this.restante - precio;
        this.listaGastos.push(new Gasto(nombre,precio))
        this.VisualizarGastos();
        formulario.reset();
    }

    // Eliminar todos los gastos del HTML

    EliminarGastosPantalla()
    {
        const todo = document.querySelectorAll('.ListaGastos div');
        todo.forEach(function(gasto){
            gasto.remove();
        })
    }

    // Visualizar gastos

    VisualizarGastos()
    {
        this.EliminarGastosPantalla();
        const titulo = document.querySelector('.gastos');
        let contador = 1;
        this.listaGastos.forEach( function(gasto){
            const div = document.createElement('div');
            div.innerHTML = `
                <p>${gasto.nombre}</p>
                <p>${gasto.precio}</p>
                <p class="btn-Eliminar">X</p>
            `;
            div.classList.add('gastoMuestra');
            div.id = contador;
            contador++;
            titulo.parentElement.appendChild(div);
        });
        this.PresupuestoTotal();
        this.VisualizarRestante();
    }

    // Visualizar presupuesto total

    PresupuestoTotal()
    {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>Presupuesto: ${this.presupuesto}</p>
        `;
        div.classList.add('PresupuestoTotal');
        const titulo = document.querySelector('.gastos');
        titulo.parentElement.appendChild(div);
    }

    // Visualizar presupuesto restante

    VisualizarRestante()
    {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>Restante: ${this.restante}</p>
        `;
        div.classList.add('cantidadRestante')
        if((this.restante/this.presupuesto) >= 0.75)
        {
            div.classList.add('buenaCantidad');
        }
        else{
            if((this.restante/this.presupuesto) >= 0.50)
            {
                div.classList.add('mediaCantidad');
            }
            else{
                div.classList.add('insuficienteCantidad');
            }
        }
        const titulo = document.querySelector('.gastos');
        titulo.parentElement.appendChild(div);
    }

    static MostrarMensajeError(error)
    {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>${error}</p>
        `;
        div.classList.add('error');
        seccionAgregar.insertBefore(div,formulario);

        setTimeout( () =>  {
            document.querySelector('.error').remove();
        }, 2100);
    }
}

class Gasto{
    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = precio;
    }

    static ComprobarPrecio()
    {
        let correcto = false;
        const nombre = document.querySelector('#nombre').value;
        const precio = parseFloat(document.querySelector('#precio').value);
        if(precio.toString() != "NaN"|| nombre != "")
        {
            if (Number.isInteger(precio))
            {
                if(nombre != "")
                {
                    correcto = true;
                }
                else
                {
                    ListaGastos.MostrarMensajeError('El nombre del gasto no puede estar vacío');
                }
            }
            else
            {
                ListaGastos.MostrarMensajeError('La cantidad indicada debe de ser monetaria')
            }
        }
        else
        {
            ListaGastos.MostrarMensajeError('Los dos campos son obligatorios')
        }
        return correcto;
    }
}

const seccionAgregar = document.querySelector('.AgregarGasto');
const formulario = document.querySelector('.formulario');
const btnEnviar = document.querySelector('input#enviar');
const listGastos = document.querySelector('.ListaGastos');  

let lista = new ListaGastos();

añadirEventListener();
lista.VisualizarGastos();

function añadirEventListener(){
    formulario.addEventListener('submit', e =>{
        e.preventDefault();
        if (Gasto.ComprobarPrecio())
        {
            lista.AgregarGasto();
        }
    })

    listGastos.addEventListener('click', e => {
        if(e.target.classList.contains('btn-Eliminar'))
        {
            const precioDeVuelta = lista.listaGastos[e.target.parentElement.id - 1].precio;
            lista.restante += precioDeVuelta;
            lista.listaGastos.splice(e.target.parentElement.id - 1, 1);
            lista.VisualizarGastos();
        }
    });
}