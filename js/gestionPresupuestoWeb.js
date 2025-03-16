
function mostrarDatoEnId(idElemento, valor){
    let elemento= document.getElementById(idElemento);
    if(elemento){
        elemento.textContent=valor;
    }
}




export { 
    mostrarDatoEnId, 
    mostrarGastoWeb, 
    mostrarGastosAgrupadosWeb 
}