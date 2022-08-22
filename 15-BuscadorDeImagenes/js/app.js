const btnBuscar = document.querySelector("#enviarBTN");
btnBuscar.addEventListener("click", (e) => {
    e.preventDefault();
    const textoBusqueda = document.querySelector("#textoBusqueda").value;
    let link = "https://pixabay.com/api/?key=29437212-b8b72f58ce7fc30470fd85277&q=" + textoBusqueda + "&image_type=photo"

    fetch(link)
        .then(resultado =>{
            return resultado.json();
        })
        .then(resultado => {
            console.log(resultado);
            MostrarResultados(resultado);
            MostrarNumeroPaginas(resultado.totalHits);
        })
    
})


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

    for(let numero = 0; numero < totalPaginas; numero++){
        numeroPagina.innerHTML += `
        <button>${numero}</button>
    `
    }
}