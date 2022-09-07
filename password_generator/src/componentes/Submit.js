import React from "react";
import { GeneratePassword } from "./Helpers";

function Submit({setTexto, uppercase, lowercase, numbers, symbols, range, opcionesFinal ,setOpciones}){

    let opciones = "";

    function llamarFuncion(e){
        e.preventDefault();
        if(uppercase === "true")
        {
            opciones += "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
        }

        if(lowercase === "true")
        {
            opciones += "abcdefghijklmnñopqrstuvwxyz"
        }

        if(numbers === "true")
        {
            opciones += "1234567890";
        }

        if(symbols === "true")
        {
            opciones += ".,:;_-?¿=/&%$·";
        }
        setOpciones(opcionesFinal)
        let password = GeneratePassword(range, opciones);
        setTexto(password);
    }

    return(
        <div className="linea-submit">
            <input type="submit" value="Generate Password" id="btn-GeneratePassword" onClick={llamarFuncion}></input>
        </div>
    )
}

export default Submit;