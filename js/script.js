/* VARIABLES GLOBALES */

const dolarOficial = 241.39;
const impuestoPais = 1.30;
const percepGanancias = 1.45;
const percepBienes = 1.25;

class Producto {
    constructor(nombre, precioLoc, precioEnvioLoc, precioExt, precioEnvioExt) {
        this.nombre = nombre.toUpperCase();
        this.precioLoc = precioLoc;
        this.precioEnvioLoc = precioEnvioLoc;
        this.precioExt = precioExt;
        this.precioEnvioExt = precioEnvioExt;
    }
}

const arrayProductos = [];

let nombreUser = prompt("Ingrese su nombre");

let cantidadProdcutos = parseInt(prompt("¿Cuántos prodcutos va a ingresar?"));
cantidadProdcutos = chequearCantidadProductos(cantidadProdcutos);

for (let i = 0; i < cantidadProdcutos; i++) {
    let nombreProducto = prompt("Ingrese el nombre del producto");

    let precioLoc = parseInt(prompt("Ingrese el valor en $ARS del mercado local"));
    precioLoc = chequearSiEsValorCorrecto(precioLoc, "$ARS", "mercado local");

    let precioEnvioLoc = parseInt(prompt("Ingrese el valor en $ARS del envío local"));
    precioEnvioLoc = chequearSiEsValorCorrecto(precioEnvioLoc, "$ARS", "envío local");

    let precioExt = parseInt(prompt("Ingrese el valor en $USD del mercado exterior"));
    precioExt = chequearSiEsValorCorrecto(precioExt, "$USD", "mercado exterior");

    let precioEnvioExt = parseInt(prompt("Ingrese el valor en $USD del envío exterior"));
    precioEnvioExt = chequearSiEsValorCorrecto(precioEnvioExt, "$USD", "envío exterior");

    arrayProductos.push(new Producto(nombreProducto, precioLoc, precioEnvioLoc, precioExt, precioEnvioExt));
}

const decisionFinal = (mercado, precioFinal) => {
    const productos = arrayProductos.reduce((prod, e) => prod + e.nombre + " ", "");
    if (mercado == "local" || mercado == "exterior") {
        alert(`${nombreUser}, te conviene comprar tus ${productos} en el mercado ${mercado} con un precio total de $${precioFinal} ARS`);
    } else if (mercado == "igual") {
        alert(`${nombreUser}, tus productos en el mercado local y exterior cuestan $${precioFinal} ARS. Decidí vos dónde comprarlos!`);
    }
}

comparadorPrecios(decisionFinal);

/* FUNCIONES */

function chequearCantidadProductos(cantidad) {
    while (cantidad < 1) {
        cantidad = parseInt(prompt("Error! Ingrese correctamente la cantidad de productos a ingresar"));
    }
    return cantidad;
}

function chequearSiEsValorCorrecto(precio, moneda, mensaje) {
    if (mensaje == "envío local" || mensaje == "envío exterior") {
        while (isNaN(precio) || precio < 0) {
            precio = parseInt(prompt(`Error! Ingrese correctamente el valor en ${moneda} del ${mensaje}`));
        }
        return precio;
    } else {
        while (isNaN(precio) || precio <= 0) {
            precio = parseInt(prompt(`Error! Ingrese correctamente el valor en ${moneda} del ${mensaje}`));
        }
        return precio;
    }
}

function comparadorPrecios(decisionFinal) {
    let precioFinalLoc = arrayProductos.reduce((total, e) => total + e.precioLoc + e.precioEnvioLoc, 0);
    let precioFinalExt = arrayProductos.reduce((total, e) => total + e.precioExt + e.precioEnvioExt, 0);

    if (precioFinalExt < 300) {
        precioFinalExt = (precioFinalExt * dolarOficial * impuestoPais * percepGanancias).toFixed(2);
    } else {
        precioFinalExt = (precioFinalExt * dolarOficial * impuestoPais * percepGanancias * percepBienes).toFixed(2);
    }

    if (precioFinalLoc > precioFinalExt) {
        decisionFinal("exterior", precioFinalExt);
    } else if (precioFinalLoc < precioFinalExt) {
        decisionFinal("local", precioFinalLoc);
    } else {
        decisionFinal("igual", precioFinalLoc);
    }
}