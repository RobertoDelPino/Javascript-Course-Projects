import React, { useState } from "react";
import Range from "./componentes/Range";
import Checkbox from "./componentes/Checkbox";
import Submit from "./componentes/Submit";
import MostrarPassword from "./componentes/MostrarPassword";

function App() {

  const [texto, setTexto] = useState("");

  const [lowercase, setLowercase] = useState("");
  const [uppercase, setUppercase] = useState("");
  const [numbers, setNumbers] = useState("");
  const [symbols, setSymbols] = useState("");
  const [range, setRange] = useState(20);
  const [opciones, setOpciones] = useState("");

  let componente;
  if(texto.toString() !== "")
  {
    componente = <MostrarPassword texto = {texto} />;
  }
  else{
    componente = ""
  }

  return (
    <form>
      {componente}
        <Range 
          range = {range}
          setRange = {setRange}
        />
        <Checkbox 
          lowercase = {lowercase}
          setLowercase = {setLowercase}
          uppercase = {uppercase}
          setUppercase = {setUppercase}
          numbers = {numbers}
          setNumbers = {setNumbers}
          symbols = {symbols}
          setSymbols = {setSymbols}
        />

        <Submit 
          setTexto = {setTexto}
          lowercase = {lowercase}
          uppercase = {uppercase}
          numbers = {numbers}
          symbols = {symbols}
          range = {range}
          opciones = {opciones}
          setOpciones = {setOpciones}
        />
    </form>
  );
}

export default App;
