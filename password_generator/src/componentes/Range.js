import React from "react";

function Range({range, setRange}){

    function EstablecerCantidadLetas(valor){
        setRange(valor)
    }

    return (
        <div>
            <p>Cantidad de letas: {range}</p>
            <input type="range" min="0" max="20" name="" id="numeroLetras" onChange={ e => {EstablecerCantidadLetas(e.target.value)}}/>
            <br/>
        </div>
    );

}

export default Range;