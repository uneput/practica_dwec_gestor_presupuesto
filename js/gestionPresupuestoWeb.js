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



/*const botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
if (botonActualizarPresupuesto) {
    botonActualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);
}*/
const botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);

export { 
    mostrarDatoEnId, 
    mostrarGastoWeb, 
    mostrarGastosAgrupadosWeb 
}