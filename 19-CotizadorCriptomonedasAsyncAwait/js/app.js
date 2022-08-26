document.addEventListener("DOMContentLoaded", () => {
    const contenido = document.querySelector(".contenido");
    contenido.classList.add("invisible");
    const btnEnviar = document.querySelector("#btnEnviar");
    btnEnviar.addEventListener("click", e =>{
        e.preventDefault();
        if(ComprobarRespuestas())
        {
            RelizarBusqueda();
        }
    })
})

function ComprobarRespuestas()
{
    let correcto = true;
    if(moneda == "" && criptomoneda == ""){
        MostrarError("Se debe indicar la moneda y la criptodisiva para realizar la cotización");
        correcto = false;
    }
    else{
        if(criptomoneda == ""){
            MostrarError("Se debe indicar la criptomoneda para poder hacer la cotización");
            correcto = false;
        }
        else{
            if(moneda == ""){
                MostrarError("Se debe indicar la moneda para realizar la cotización");
                correcto = false;
            }
        }
    }
    return correcto;
}

async function RelizarBusqueda(){
    const moneda = document.querySelector("#moneda").value;
    const criptomoneda = document.querySelector("#criptomoneda").value;

    let link = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + criptomoneda + "&tsyms=" + moneda;
    
    try{
        let response = await fetch(link);
        let objeto = await response.json();
       
        if(objeto.Response == "Error")
        {
            MostrarError(objeto.Message)
        }
        else{
            MostrarResultado(objeto, moneda, criptomoneda);
        }
    }
    catch (error)
    {
        console.log(error);
    }
}

function MostrarResultado(objeto, moneda, criptomoneda){
    let datosMostrar = {
        valor:objeto.DISPLAY[criptomoneda][moneda].PRICE,
        valorMasAlto:objeto.DISPLAY[criptomoneda][moneda].HIGHDAY,
        valorMasBajo:objeto.DISPLAY[criptomoneda][moneda].LOWDAY,
        variacion24horas:objeto.DISPLAY[criptomoneda][moneda].CHANGE24HOUR,
        ultimaActualizacion:objeto.DISPLAY[criptomoneda][moneda].LASTUPDATE,
    }

    const htmlContent = document.querySelector(".contenido");
    htmlContent.innerHTML = ``;
    htmlContent.innerHTML = `
        <h3>El precio es: ${datosMostrar.valor}</h3>
        <p>Valor más alto del día: ${datosMostrar.valorMasAlto}</p>
        <p>Valor más bajo el día: ${datosMostrar.valorMasBajo}</p>
        <p>Variación últimas 24 horas: ${datosMostrar.variacion24horas}</p>
        <p>Última actualización: ${ datosMostrar.ultimaActualizacion}</p>
    `
    const contenido = document.querySelector(".contenido");
    contenido.classList = "contenido";
    
}

function MostrarError(mensaje)
{
    const htmlContent = document.querySelector(".contenido");
    htmlContent.innerHTML = ``;
    htmlContent.innerHTML = `
        <h3>${mensaje}</h3>
    `;
    const contenido = document.querySelector(".contenido");
    contenido.classList = "contenido";
}