const botonBuscar = document.querySelector("#buscar");
botonBuscar.addEventListener("click", (e) => {
    e.preventDefault();
    RequestSong()
});

function RequestSong()
{
    const cantante = document.querySelector("#cantante");
    const cancion = document.querySelector("#cancion");

    const link = "https://api.lyrics.ovh/v1/" + cantante.value + "/" + cancion.value;

    fetch(link)
        .then(resultado => {
            return resultado.json();
        })
        .then(cancion => {
            contenidoHTML = document.querySelector(".contenido");
            contenidoHTML.innerHTML = "";
            contenido = cancion.lyrics.split("\n");
            contenido.forEach(element => {
                if(element == "")
                {
                    contenidoHTML.innerHTML += `
                        <br>
                    `
                }
                else{
                    contenidoHTML.innerHTML += `
                    <p>${element}</p>
                `
                }
            });
        })

}