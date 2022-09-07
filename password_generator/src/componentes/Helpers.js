export function GeneratePassword(range, opciones){
    let resultado = "";

    if (opciones === "")
    {
        return "";
    }
    else{
        for(let contador = 0; contador < range; contador++)
        {
            resultado += opciones[RandomNumber(opciones.length)];
        }
    }

    return resultado;
}

function RandomNumber(number)
{
    return Math.floor(Math.random() * number)
}