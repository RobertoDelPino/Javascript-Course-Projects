import React from "react";
import Copiar from "./CopiarTexto";

function MostrarPassword({texto}){
    return (
        <div className="caja-resultado">
            <p>{texto}</p>
            <Copiar 
                texto = {texto}
            />
        </div>
    );
}

export default MostrarPassword;