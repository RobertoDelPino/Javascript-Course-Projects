export function CalcularPrestamo(meses, cantidad){
    cantidad = parseInt(cantidad)
    meses = parseInt(meses)
    
    let totalCantidad = 0;
    if (cantidad <= 1000){
        totalCantidad = cantidad * 0.25;
    }
    else if (cantidad > 1000 && cantidad <= 5000){
        totalCantidad = cantidad * 0.20;
    }
    else if (cantidad > 5000 && cantidad <= 10000){
        totalCantidad = cantidad * 0.15;
    }
    else{
        totalCantidad = cantidad * 0.10;
    }
    
    let totalPlazo;
    switch(meses){
        case 3: totalPlazo = cantidad * .05; break;
        case 6: totalPlazo = cantidad * .10; break;
        case 12: totalPlazo = cantidad * .15; break;
        case 24: totalPlazo = cantidad * .20; break;
        default: break;
    }

    const total = totalCantidad + totalPlazo + cantidad;

    return total
}