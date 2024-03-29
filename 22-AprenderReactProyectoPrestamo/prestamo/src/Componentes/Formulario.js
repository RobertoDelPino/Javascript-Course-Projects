import React from "react";
import { CalcularPrestamo } from "./Helpers";

function Formulario({cantidad, setCantidad, meses, setMeses, totalPagar}){

    function calcularPagoTotal (e) {
        e.preventDefault()
        totalPagar(CalcularPrestamo(meses, cantidad))
    }

    return (
        <form onSubmit={calcularPagoTotal}>
             <div className="row">
                <div>
                    <label>Cantidad Prestamo</label>
                    <input 
                        className="u-full-width" 
                        type="number" 
                        placeholder="Ejemplo: 3000"
                        onChange={(e) => (setCantidad(e.target.value))}
                        min="0"
                    />
                </div>
                <div>
                    <label>Plazo para Pagar</label>
                    <select 
                        className="u-full-width"
                        onChange={(e) => (setMeses(e.target.value))}
                    >
                        <option value="">Seleccionar</option>
                        <option value="3">3 meses</option>
                        <option value="6">6 meses</option>
                        <option value="12">12 meses</option>
                        <option value="24">24 meses</option>
                    </select>
                </div>
                <div>
                    <input 
                        type="submit" 
                        value="Calcular" 
                        className="button-primary u-full-width"
                    />
                </div>
          </div>
        </form>
    );
}

export default Formulario;