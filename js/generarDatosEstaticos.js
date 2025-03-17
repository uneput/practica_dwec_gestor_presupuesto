import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js'

gestionPresupuesto.actualizarPresupuesto(1500);

gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());


const gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
const gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
const gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
const gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
const gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
const gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

const totalGastos = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", totalGastos);

const balanceTotal = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", balanceTotal);

/*const listadoGastos = gestionPresupuesto.listarGastos();
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", listadoGastos);*/
const listadoGastos = gestionPresupuesto.listarGastos();
listadoGastos.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
});

const gastosSeptiembre2021 = gestionPresupuesto.filtrarGastos("2021-09");
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gastosSeptiembre2021);

const gastosMayoresDe50 = gestionPresupuesto.filtrarGastos(50);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gastosMayoresDe50);

const gastosMayoresDe200ConSeguros = gestionPresupuesto.filtrarGastos(200, "seguros");
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gastosMayoresDe200ConSeguros);

const gastosFiltrados = gestionPresupuesto.filtrarGastos();
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gastosFiltrados);

const gastosAgrupados = agruparGastos('dia');
mostrarGastosAgrupadosWeb('agrupacion-dia', gastosAgrupados, 'dia');

const gastosAgrupadosPorMes = agruparGastos('mes');
mostrarGastosAgrupadosWeb('agrupacion-mes', gastosAgrupadosPorMes, 'mes');

const gastosAgrupadosPorAnyo = agruparGastos('año');
mostrarGastosAgrupadosWeb('agrupacion-anyo', gastosAgrupadosPorAnyo, 'año');