
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




export { 
    mostrarDatoEnId, 
    mostrarGastoWeb, 
    mostrarGastosAgrupadosWeb 
}