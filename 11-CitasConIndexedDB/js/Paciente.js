export class Paciente{
    constructor(nombre,propietario,telefono,fecha,hora,sintomas)
    {
        this.nombre = nombre;
        this.propietario = propietario;
        this.telefono = telefono;
        this.fecha = fecha;
        this.hora = hora;
        this.sintomas = sintomas;
        this.id = Math.floor(Math.random() * 2000000 + 1).toString();
    }
}