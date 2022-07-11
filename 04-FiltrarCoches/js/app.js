const years = document.querySelector('#anios');
const marcas = document.querySelector('#marcas');
const puertas = document.querySelector('#puertas');
const resultado = document.querySelector('.resultado');

// Objeto donde se encuentra toda la información necesaria:
const datosBusqueda = {
    marca:"",
    year:"",
    puertas:""
};

// Eventos que se cargan al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Introducir en el select de los años todos los años
    // hasta 10 anteriores.
    cargarAnios();
	filtrarCoches();
})

marcas.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    filtrarCoches();
})

years.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);
    filtrarCoches();
})

puertas.addEventListener('change', e => {

    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarCoches();
})

// Funciones

// Limpiar Seccion RESULTADOS

function limpiarResultados(){
    resultado.innerHTML = "";
}

// Mostrar los resultados

function mostrarResultados(resultadoAutos)
{
    limpiarResultados();
    resultadoAutos.forEach( e => {
        const elemento = document.createElement('p');
        elemento.textContent = `
        ${e.marca} ${e.year} ${e.puertas}
        `;
        resultado.appendChild(elemento);
    });


}

// Filtrar coches cuando se hace un cambio en el select
// Toda esta forma es para que se vea más entendible
// cuando se utiliza los .filter;
function filtrarCoches(){
    const resultados = autos.filter(filtrarMarcas).filter(filtrarYears).filter(filtrarPuertas);
    console.log(resultados);
    if (resultados.length > 0)
    {
        mostrarResultados(resultados);
    }
    else
    {
        limpiarResultados();
        const elemento = document.createElement('p');
        elemento.innerText = "No se ha encontrado ningún coche";
        resultado.appendChild(elemento);
    }
}

function filtrarMarcas(auto){
    const { marca } = datosBusqueda;
    if( marca ){
        return auto.marca == marca;
    }
    return auto;
}

function filtrarYears(auto){
    const { year } = datosBusqueda;
    if( year ){
        return auto.year === year;
    }
    return auto;
}

function filtrarPuertas(auto){
    const { puertas } = datosBusqueda;
    if( puertas ){
        return auto.puertas === puertas;
    }
    return auto;
}

function cargarAnios(){
    const max = new Date().getFullYear();
    const min = max - 10;

    for(let contador = max; contador >= min; contador-- )
    {
        const option = document.createElement('option');
        option.value = contador;
        option.textContent = contador;
        years.appendChild(option);
    }
}




const autos = [
	{
		marca: 'BMW',
		modelo: 'Serie 3',
		year: 2020,
		precio: 30000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico'
	},
	{ 
        marca: 'Audi', 
        modelo: 'A4', 
        year: 2020, 
        precio: 40000, 
        puertas: 4, 
        color: 'Negro', 
        transmision: 'automatico' 
    },
	{
		marca: 'Ford',
		modelo: 'Mustang',
		year: 2015,
		precio: 20000,
		puertas: 2,
		color: 'Blanco',
		transmision: 'automatico'
	},
	{ 
        marca: 'Audi', 
        modelo: 'A6', 
        year: 2020, 
        precio: 35000, 
        puertas: 4, 
        color: 'Negro', 
        transmision: 'automatico' 
    },
	{
		marca: 'BMW',
		modelo: 'Serie 5',
		year: 2016,
		precio: 70000,
		puertas: 4,
		color: 'Rojo',
		transmision: 'automatico'
	},
	{
		marca: 'Mercedes Benz',
		modelo: 'Clase C',
		year: 2015,
		precio: 25000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico'
	},
	{
		marca: 'Chevrolet',
		modelo: 'Camaro',
		year: 2018,
		precio: 60000,
		puertas: 2,
		color: 'Rojo',
		transmision: 'manual'
	},
	{ 
        marca: 'Ford', 
        modelo: 'Mustang', 
        year: 2019, 
        precio: 80000, 
        puertas: 2, 
        color: 'Rojo', 
        transmision: 'manual' 
    },
	{
		marca: 'Dodge',
		modelo: 'Challenger',
		year: 2020,
		precio: 40000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico'
	},
	{ 
        marca: 'Audi', 
        modelo: 'A3', 
        year: 2017, 
        precio: 55000, 
        puertas: 2, 
        color: 'Negro', 
        transmision: 
        'manual' 
    },
	{
		marca: 'Dodge',
		modelo: 'Challenger',
		year: 2020,
		precio: 25000,
		puertas: 2,
		color: 'Rojo',
		transmision: 'manual'
	},
	{
		marca: 'Mercedes Benz',
		modelo: 'Clase C',
		year: 2018,
		precio: 45000,
		puertas: 4,
		color: 'Azul',
		transmision: 'automatico'
	},
	{
		marca: 'BMW',
		modelo: 'Serie 5',
		year: 2019,
		precio: 90000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico'
	},
	{ 
        marca: 'Ford', 
        modelo: 'Mustang', 
        year: 2017, 
        precio: 60000, 
        puertas: 2, 
        color: 'Negro', 
        transmision: 'manual' 
    },
	{
		marca: 'Dodge',
		modelo: 'Challenger',
		year: 2015,
		precio: 35000,
		puertas: 2,
		color: 'Azul',
		transmision: 'automatico'
	},
	{
		marca: 'BMW',
		modelo: 'Serie 3',
		year: 2018,
		precio: 50000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico'
	},
	{
		marca: 'BMW',
		modelo: 'Serie 5',
		year: 2017,
		precio: 80000,
		puertas: 4,
		color: 'Negro',
		transmision: 'automatico'
	},
	{
		marca: 'Mercedes Benz',
		modelo: 'Clase C',
		year: 2018,
		precio: 40000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico'
	},
	{ 
        marca: 'Audi', 
        modelo: 'A4', 
        year: 2016, 
        precio: 30000, 
        puertas: 4, 
        color: 'Azul', 
        transmision: 'automatico' 
    }
];