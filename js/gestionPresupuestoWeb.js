import * as presupuesto from './gestionPresupuesto.js';

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
    
     // botón Editar
     const botonEditar = document.createElement('button');
     botonEditar.classList.add('gasto-editar');
     botonEditar.textContent = 'Editar';
     botonEditar.type = 'button';

     const editarHandle = new EditarHandle(gasto);
     botonEditar.addEventListener('click', editarHandle);

     // botón Borrar
    const botonBorrar = document.createElement('button');
    botonBorrar.classList.add('gasto-borrar');
    botonBorrar.textContent = 'Borrar';
    botonBorrar.type = 'button';

    const borrarHandle = new BorrarHandle(gasto);
    botonBorrar.addEventListener('click', borrarHandle);

    //botón borrar API
    const botonBorrarApi = document.createElement('button');
    botonBorrarApi.classList.add('gasto-borrar-api');
    botonBorrarApi.textContent = 'Borrar (API)';
    botonBorrarApi.type = 'button';

    const borrarApiHandle = new BorrarHandleApi(gasto);
    botonBorrarApi.addEventListener('click', borrarApiHandle);

    //botón Editar Formulario
    const botonEditarFormulario = document.createElement('button');
    botonEditarFormulario.classList.add('gasto-editar-formulario');
    botonEditarFormulario.textContent = 'Editar (formulario)';
    botonEditarFormulario.type = 'button';

    const editarFormularioHandle = new EditarHandleFormulario(gasto);
    botonEditarFormulario.addEventListener('click', editarFormularioHandle);

    divGasto.appendChild(botonEditar);
    divGasto.appendChild(botonBorrar);
    divGasto.appendChild(botonBorrarApi);
    divGasto.appendChild(botonEditarFormulario);

    const etiquetas = divGasto.querySelectorAll('.gasto-etiquetas-etiqueta');
    for (let i = 0; i < etiquetas.length; i++) {
        const etiquetaSpan = etiquetas[i];
        const borrarEtiquetaHandle = new BorrarEtiquetasHandle(gasto, etiquetaSpan.textContent);
        etiquetaSpan.addEventListener('click', borrarEtiquetaHandle);
    }
  
    contenedor.appendChild(divGasto);
}

/*function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
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
}*/

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

    const nuevoGasto = new presupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);

    presupuesto.anyadirGasto(nuevoGasto);

    repintar();
}

function nuevoGastoWebFormulario(event) {
    event.preventDefault();

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");

    const botonAñadirGasto = document.getElementById('anyadirgasto-formulario');
    botonAñadirGasto.disabled = true;

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        const descripcion = formulario.querySelector('#descripcion').value;
        const valor = parseFloat(formulario.querySelector('#valor').value);
        const fecha = formulario.querySelector('#fecha').value;
        const etiquetasInput = formulario.querySelector('#etiquetas').value;
        const etiquetas = etiquetasInput.split(',').map(etiqueta => etiqueta.trim()).filter(etiqueta => etiqueta !== "");

        const nuevoGasto = presupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
        presupuesto.anyadirGasto(nuevoGasto);

        //repintar();

        botonAñadirGasto.disabled = false;

        formulario.remove();
    });

    const botonEnviar = formulario.querySelector('.gasto-enviar-api');
    botonEnviar.addEventListener('click', function() {
        const nombreUsuario = document.getElementById('nombre_usuario').value.trim();

        if (!nombreUsuario) {
            alert('Por favor, introduce un nombre de usuario.');
            return;
        }

        const descripcion = formulario.querySelector('#descripcion').value;
        const valor = parseFloat(formulario.querySelector('#valor').value);
        const fecha = formulario.querySelector('#fecha').value;
        const etiquetasInput = formulario.querySelector('#etiquetas').value;
        const etiquetas = etiquetasInput.split(',').map(etiqueta => etiqueta.trim()).filter(etiqueta => etiqueta !== "");

        const nuevoGasto = {
            descripcion: descripcion,
            valor: valor,
            fecha: fecha,
            etiquetas: etiquetas
        };

        const url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoGasto)
        })
        .then(response => {
            if (response.ok) {
                cargarGastosApi();
            } else {
                alert('Error al enviar el gasto.');
            }
        })
        .catch(error => {
            alert('Error al intentar enviar el gasto: ' + error);
        });
    });

    /*const cancelarButton = formulario.querySelector('button.cancelar');
    cancelarButton.addEventListener('click', function() {
        formulario.remove();
        botonAñadirGasto.disabled = false;
    });*/
    const cancelarButton = formulario.querySelector('button.cancelar');
    cancelarButton.addEventListener('click', new ManejadorCancelarNuevoGastoWForm(formulario, botonAñadirGasto));

    const controlesPrincipales = document.getElementById('controlesprincipales');
    controlesPrincipales.appendChild(plantillaFormulario);
}

function cargarGastosApi() {
    const nombreUsuario = document.getElementById('nombre_usuario').value.trim();    
    /*if (!nombreUsuario) {
        alert('Por favor, introduce un nombre de usuario.');
        return;
    }*/

    const url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;

    fetch(url)
        .then(response => response.json())
        .then(gastos => {
            cargarGastos(gastos);
            repintar();
        })
        .catch(error => {
            console.error('Error al cargar los gastos:', error);
            alert('Hubo un error al cargar los gastos desde la API.');
        });       
}

document.getElementById('cargar-gastos-api').addEventListener('click', cargarGastosApi);

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
    presupuesto.borrarGasto(this.gasto.id);
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

function EditarHandleFormulario(gasto) {
    this.gasto = gasto;
}

EditarHandleFormulario.prototype.handleEvent = function () {
    const formulario = document.createElement('form');
    formulario.innerHTML = `
        <input type="text" name="descripcion" value="${this.gasto.descripcion}" required>
        <input type="number" name="valor" value="${this.gasto.valor}" required>
        <input type="date" name="fecha" value="${this.gasto.fecha}" required>
        <input type="text" name="etiquetas" value="${this.gasto.etiquetas.join(', ')}">
        <button type="submit">Guardar</button>
        <button type="button" class="cancelar">Cancelar</button>
        <button type="button" class="gasto-enviar-api">Enviar API</button>
    `;

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        this.gasto.actualizarDescripcion(formulario.descripcion.value);
        this.gasto.actualizarValor(parseFloat(formulario.valor.value));
        this.gasto.actualizarFecha(formulario.fecha.value);
        this.gasto.anyadirEtiquetas(formulario.etiquetas.value.split(',').map(e => e.trim()).filter(e => e !== ""));

        repintar();
    });

    formulario.querySelector('.gasto-enviar-api').addEventListener('click', () => {
        const nombreUsuario = document.getElementById('nombre_usuario').value.trim();
        if (!nombreUsuario) {
            alert('Por favor, introduce un nombre de usuario.');
            return;
        }

        const descripcion = formulario.querySelector('[name="descripcion"]').value;
        const valor = parseFloat(formulario.querySelector('[name="valor"]').value);
        const fecha = formulario.querySelector('[name="fecha"]').value;
        const etiquetasInput = formulario.querySelector('[name="etiquetas"]').value;
        const etiquetas = etiquetasInput.split(',').map(etiqueta => etiqueta.trim()).filter(etiqueta => etiqueta !== "");

        const gastoActualizado = {
            descripcion: descripcion,
            valor: valor,
            fecha: fecha,
            etiquetas: etiquetas
        };

        const url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gastoActualizado)
        })
        .then(response => {
            if (response.ok) {
                cargarGastosApi();
                formulario.remove();
            }else {
                alert('Error al actualizar el gasto.');
            }
        })
        .catch(error => {
            alert('Error al intentar actualizar el gasto: ' + error);
        })
    });

    formulario.querySelector('.cancelar').addEventListener('click', new ManejadorCancelarNuevoGastoWForm(formulario));

    const contenedor = document.getElementById('listado-gastos-completo');
    //contenedor.innerHTML = '';
    contenedor.appendChild(formulario);
};

function BorrarHandleApi(gasto) {
    this.gasto = gasto;
}

BorrarHandleApi.prototype.handleEvent = function () {

    const nombreUsuario = document.getElementById('nombre_usuario').value.trim();

    if (!nombreUsuario) {
        alert('Por favor, introduce un nombre de usuario.');
        return;
    }

    const gastoId = this.gasto.gastoId;
    if (!gastoId) {
        alert('No se pudo obtener el ID del gasto.');
        return;
    }

    const url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${gastoId}`;

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo eliminar el gasto.');
        }
        return response.json();
    })
    .then(() => {
        cargarGastosApi();
    })
    .catch(error => {
        console.error('Error eliminando el gasto:', error);
        alert('Hubo un error al intentar eliminar el gasto.');
    });
};

function ManejadorCancelarNuevoGastoWForm(formulario, botonAñadirGasto) {
    this.formulario = formulario;
    this.botonAñadirGasto = botonAñadirGasto;
}
ManejadorCancelarNuevoGastoWForm.prototype.handleEvent = function(event) {
    this.formulario.remove(); // Eliminar el formulario
    this.botonAñadirGasto.disabled = false; // Reactivar el botón de añadir gasto
};


const botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);

const botonAñadirGasto = document.getElementById('anyadirgasto');
botonAñadirGasto.addEventListener('click', nuevoGastoWeb);

const botonAñadirGastoFormulario = document.getElementById('anyadirgasto-formulario');
botonAñadirGastoFormulario.addEventListener('click', nuevoGastoWebFormulario);

export { 
    mostrarDatoEnId, 
    mostrarGastoWeb, 
    /*mostrarGastosAgrupadosWeb*/
}