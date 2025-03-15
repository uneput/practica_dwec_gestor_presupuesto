// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

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

function CrearGasto(descripcion, valor, fecha = new Date().toISOString(), ...etiquetas) {
    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }
    this.descripcion = descripcion;

    let fechaTimestamp = Date.parse(fecha);
    if (isNaN(fechaTimestamp)) {
        this.fecha= Date.now();
    }else{
        this.fecha = fechaTimestamp;
    }

    if(etiquetas.length > 0){
        this.etiquetas = etiquetas;
    }else{
        this.etiquetas = []; 
    }

    this.mostrarGasto = function() {
        console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor){
        if(nuevoValor >= 0){
            this.valor = nuevoValor;
        }
    }
    this.anyadirEtiquetas = function(...nuevasEtiquetas){
        for (let i = 0; i < nuevasEtiquetas.length; i++) {
            let etiqueta = nuevasEtiquetas[i];
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        };
    };

    this.mostrarGastoCompleto = function(){
        let fechaLocalizada = new Date(this.fecha).toLocaleString();
        let etiquetasTexto = "";
        for (let i = 0; i < this.etiquetas.length; i++) {
            etiquetasTexto += ` - ${this.etiquetas[i]}\n`;
        }
        console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
            Fecha: ${fechaLocalizada}
            Etiquetas:
            ${etiquetasTexto}`);
    };

    this.actualizarFecha = function(nuevaFecha) {
        let fechaTimestamp = Date.parse(nuevaFecha);
        if (!isNaN(fechaTimestamp)) {
            this.fecha = fechaTimestamp;
        }
    };

    this.borrarEtiquetas = function(...etiquetasAEliminar) {
        for (let i = 0; i < etiquetasAEliminar.length; i++) {
            let etiqueta = etiquetasAEliminar[i];
            let index = this.etiquetas.indexOf(etiqueta);
            if (index !== -1) {
                this.etiquetas.splice(index, 1);
            }
        };
    };
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    
    gastos.push(gasto);
}

function borrarGasto(id){
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            gastos.splice(i, 1);
            return;
        }
    }
}

function calcularTotalGastos(){
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        total += gastos[i].valor;
    }
    return total;
}

function calcularBalance(){
    let totalGastos = calcularTotalGastos();
    let balance = presupuesto - totalGastos;
    return balance;
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
