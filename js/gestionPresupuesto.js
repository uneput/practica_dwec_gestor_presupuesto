// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    if(valor >= 0){
        presupuesto = valor;
        return presupuesto;
    }else{
        console.error("Error el valor no puede ser negativo")
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto es de ${presupuesto}€`;
}

/*function CrearGasto(valor) {
    // TODO
    let gasto= {};
    if(valor >= 0){
        gasto.valor= valor;
    }else{
        gasto.valor= 0;
    }
    return gasto;
}*/
function CrearGasto(descripcion, valor) {
    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    this.descripcion = descripcion;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
