const btnBuscar = document.querySelector("#enviarBTN");
btnBuscar.addEventListener("click", (e) => {
    e.preventDefault();
    RealizarBusqueda();
})


document.addEventListener("DOMContentLoaded",() =>{
    const numeroPagina = document.querySelector(".numeroPagina");
    numeroPagina.addEventListener("click", e => {
        if(e.target.id == "btnNumeroPag"){
            const hiddenBtn = document.querySelector("#numPag");
            hiddenBtn.name = e.target.classList.value;
            RealizarBusqueda();
        }
    })
})

async function RealizarBusqueda()
{
    const textoBusqueda = document.querySelector("#textoBusqueda").value;
    const numPag = document.querySelector("#numPag").name;
    let link = "https://pixabay.com/api/?key=29437212-b8b72f58ce7fc30470fd85277&q=" + textoBusqueda + "&image_type=photo&page=" + numPag;

    let response = await fetch(link);
    let informacion = await response.json();
    MostrarResultados(informacion);
    MostrarNumeroPaginas(informacion.totalHits);
}

function MostrarResultados(listado)
{
    const contenido = document.querySelector(".contenido");
    contenido.innerHTML = "";
    listado.hits.forEach(element => {
        contenido.innerHTML += `
            <a href="${element.pageURL}" target="_blank" >
            <img class="pequenio" src="${element.webformatURL}"></img>
            </>
        `
    });
}

function MostrarNumeroPaginas(total)
{
    let totalPaginas = total / 20;
    let numeroPagina = document.querySelector(".numeroPagina");
    numeroPagina.innerHTML = "";

    for(let numero = 1; numero <= totalPaginas; numero++){
        numeroPagina.innerHTML += `
        <button id="btnNumeroPag" class="${numero}">${numero}</button>
    `
    }
}