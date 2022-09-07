import React from "react";

function Checkbox( props ) {

    let {lowercase, setLowercase, uppercase, setUppercase, numbers, setNumbers, symbols, setSymbols} = props;

    function CambiarUpperCase(){
        switch(uppercase){
            case "false": setUppercase("true");break;
            case "true": setUppercase("false");break;
            default: setUppercase("true"); break;
        }
    };

    function CambiarLowerCase(){
        switch(lowercase){
            case "false": setLowercase("true");break;
            case "true": setLowercase("false");break;
            default: setLowercase("true"); break;
        }
    };

    function CambiarNumbers(){
        switch(numbers){
            case "false": setNumbers("true"); break;
            case "true": setNumbers("false");break;
            default: setNumbers("true"); break;
        }
    };

    function CambiarSymbols(){
        switch(symbols){
            case "false": setSymbols("true");break;
            case "true": setSymbols("false");break;
            default: setSymbols("true"); break;
        }
    };


    return (
        <div className="caja-CheckBox">
            <div className="linea-checkbox">
                <input type="checkbox" name="uppercase" id="includes" onChange={CambiarUpperCase}/>
                <p>Include Uppercase Letters</p>
            </div>
            <div className="linea-checkbox">
                <input type="checkbox" name="lowercase" id="includes" onChange={CambiarLowerCase}/>
                <p>Include Lowercase Letters</p>
            </div>
            <div className="linea-checkbox">
                <input type="checkbox" name="number" id="includes" onChange={CambiarNumbers}/>
                <p>Include Numbers</p>
            </div>
            <div className="linea-checkbox">
                <input type="checkbox" name="symbol" id="includes" onChange={CambiarSymbols}/>
                <p>Include Symbols</p>
            </div>
        </div>
    );
}

export default Checkbox;