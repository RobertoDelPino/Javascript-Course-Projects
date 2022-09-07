import React from "react";

function Copiar({texto}){
    
    function copiarTexto(e){
        e.preventDefault()
        navigator.clipboard.writeText(texto);
    }

    return(
        <div>
            <button onClick={copiarTexto}>Copy text</button>
        </div>
    );
}

export default Copiar;