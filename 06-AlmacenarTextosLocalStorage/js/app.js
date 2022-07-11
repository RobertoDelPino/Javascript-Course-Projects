const btnEnviar = document.querySelector('.btn-Enviar');
const textArea = document.querySelector('#almacenarTexto');
const listaTweets = document.querySelector('#listaTextos');

let contador = 0;
let lista = [];

const arrayLocalStorage = localStorage.getItem('lista');
if(arrayLocalStorage != null && arrayLocalStorage != "[]")
{
    lista = JSON.parse(arrayLocalStorage);
    contador = Number.parseInt(lista[lista.length - 1].contador);
}


InicioApp();

function InicioApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('desactivado');

    textArea.addEventListener('blur', ComprobarInfo);
    btnEnviar.addEventListener('click', AgregarTweet);
    listaTweets.addEventListener('click', EliminarTweet);

    MostrarTweets();
}

function ComprobarInfo(e)
{
    if(e.target.value != "")
    {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('desactivado');
    }
    else{
        btnEnviar.disabled = true;
        btnEnviar.classList.add('desactivado');
    }
}

function AgregarTweet(e)
{
    e.preventDefault();
    const texto = {name:textArea.value,id:contador};
    contador++;
    lista.push(texto);
    localStorage.setItem('lista',JSON.stringify(lista));
    MostrarTweets();
}

function MostrarTweets()
{
    vaciarTweets();
    for(let contador = 0; contador < lista.length; contador++)
    {
        const element = document.createElement('li');
        element.innerHTML = `
        <p class="nombreTexto">${lista[contador].name}</p>
        <p class="btn-EliminarTexto" id="${lista[contador].id}">X</p>
        `;
        listaTweets.appendChild(element);
    }
}

function vaciarTweets()
{
    listaTweets.innerHTML = "";
    lista.slice(0,lista.length - 1);
    localStorage.setItem('lista',JSON.stringify(lista));
}

function EliminarTweet(e)
{
    if(e.target.classList.contains('btn-EliminarTexto'))
    {
        let contador = 0;
        let final = false;
        while (!final)
        {
            if(e.target.id == lista[contador].id)
            {
                lista.splice(contador, 1);
                localStorage.setItem('lista',JSON.stringify(lista));
                final = true;
                MostrarTweets();
            }
            else
            {
                if(contador === lista.length - 1)
                {
                    final = true;
                }
                else
                {
                    contador++;
                }
            }
        }
    }
}