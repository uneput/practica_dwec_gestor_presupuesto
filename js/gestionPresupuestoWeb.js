import * as presupuesto from 'js/gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
    let elemento= document.getElementById(idElemento);
    if(elemento){
        elemento.textContent=valor;
    }
}

function mostrarGastoWeb(idElemento, gasto){
    const contenedor = document.getElementById(idElemento);

    const divGasto = document.createElement('div');
    divGasto.classList.add('gasto');

    divGasto.innerHTML = `
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div>
        <div class="gasto-valor">${gasto.valor}</div>
        <div class="gasto-etiquetas">
            ${gasto.etiquetas.map(etiqueta => `<span class="gasto-etiquetas-etiqueta">${etiqueta}</span>`).join('')}
        </div>
    `;
  
    contenedor.appendChild(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    //hace referencia a la practica 5
    const contenedor = document.getElementById(idElemento);
  
    const divAgrupacion = document.createElement('div');
    divAgrupacion.classList.add('agrupacion');
  
    divAgrupacion.innerHTML = `
        <h1>Gastos agrupados por ${periodo}</h1>
        ${Object.keys(agrup).map(key => `
            <div class="agrupacion-dato">
                <span class="agrupacion-dato-clave">${key}</span>
                <span class="agrupacion-dato-valor">${agrup[key]}</span>
            </div>
        `).join('')}
    `;
  
    contenedor.appendChild(divAgrupacion);
}

function repintar() {
    const presupuestoActual = presupuesto.mostrarPresupuesto();
    mostrarDatoEnId('presupuesto', presupuestoActual);

    const totalGastos = presupuesto.calcularTotalGastos();
    mostrarDatoEnId('gastos-totales', `Total de gastos: ${totalGastos} €`);
    
    const balanceTotal = presupuesto.calcularBalance();
    mostrarDatoEnId('balance-total', `Balance actual: ${balanceTotal} €`);
    
    const listadoGastos = document.getElementById('listado-gastos-completo');
    if (listadoGastos) {
        listadoGastos.innerHTML = '';
    }
    
    const gastos = presupuesto.listarGastos();
    for (let i = 0; i < gastos.length; i++) {
        mostrarGastoWeb('listado-gastos-completo', gastos[i]);
    }
}

function actualizarPresupuestoWeb() {
    const nuevoPresupuesto = prompt('Introduce el nuevo presupuesto:');
    const presupuestoValor = parseFloat(nuevoPresupuesto);
    if (!isNaN(presupuestoValor) && presupuestoValor >= 0) {
        presupuesto.actualizarPresupuesto(presupuestoValor);
        repintar();
    } else {
        alert('Por favor, introduce un valor numérico válido para el presupuesto.');
    }
}

function nuevoGastoWeb() {
    const descripcion = prompt('Introduce la descripción del gasto:');
    const valor = parseFloat(prompt('Introduce el valor del gasto:'));
    const fecha = prompt('Introduce la fecha del gasto (yyyy-mm-dd):');
    const etiquetasInput = prompt('Introduce las etiquetas separadas por comas (ej. etiqueta1,etiqueta2):');
    
    const etiquetas = etiquetasInput.split(',').map(etiqueta => etiqueta.trim()).filter(etiqueta => etiqueta !== "");

    const nuevoGasto = presupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);

    presupuesto.anyadirGasto(nuevoGasto);

    repintar();
}

function EditarHandle(gasto) {
    this.gasto = gasto;
}

EditarHandle.prototype.handleEvent = function () {
    const nuevaDescripcion = prompt("Introduce la nueva descripción:", this.gasto.descripcion);
    const nuevoValor = parseFloat(prompt("Introduce el nuevo valor:", this.gasto.valor));
    const nuevaFecha = prompt("Introduce la nueva fecha (yyyy-mm-dd):", this.gasto.fecha);
    const etiquetasInput = prompt("Introduce las nuevas etiquetas separadas por comas:", this.gasto.etiquetas.join(", "));

    const nuevasEtiquetas = etiquetasInput.split(',').map(etiqueta => etiqueta.trim()).filter(etiqueta => etiqueta !== "");

    this.gasto.actualizarDescripcion(nuevaDescripcion);
    this.gasto.actualizarValor(nuevoValor);
    this.gasto.actualizarFecha(nuevaFecha);
    this.gasto.anyadirEtiquetas(nuevasEtiquetas);

    repintar();
};

function BorrarHandle(gasto) {
    this.gasto = gasto;
}
BorrarHandle.prototype.handleEvent = function () {
    borrarGasto(this.gasto.id);
    repintar();
};

function BorrarEtiquetasHandle(gasto, etiqueta) {
    this.gasto = gasto;
    this.etiqueta = etiqueta;
}
BorrarEtiquetasHandle.prototype.handleEvent = function () {
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
};


/*const botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
if (botonActualizarPresupuesto) {
    botonActualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);
}*/
const botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);

const botonAñadirGasto = document.getElementById('anyadirgasto');
botonAñadirGasto.addEventListener('click', nuevoGastoWeb);

export { 
    mostrarDatoEnId, 
    mostrarGastoWeb, 
    mostrarGastosAgrupadosWeb 
}