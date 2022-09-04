import React,{useState} from 'react'
import Header from './Componentes/Header';
import Formulario from './Componentes/Formulario'
import TotalPagar from './Componentes/TotalPagar';

function App() {
  
  const [cantidad, setCantidad] = useState(0);

  const [meses, setMeses] = useState(0);

  const [pago, totalPagar] = useState(0);

  return (
    <div>
        <Header />
        <Formulario
          cantidad = {cantidad}
          setCantidad = {setCantidad}
          meses = {meses}
          setMeses = {setMeses}
          pago = {pago}
          totalPagar = {totalPagar}
        />

        <TotalPagar 
          pago = {pago}
        />

    </div>
    
  );
}

export default App;
