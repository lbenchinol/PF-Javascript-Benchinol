/* VARIABLES GLOBALES */

let dolarOficial = 235.98;
let impuestoPais = 1.30;
let percepGanancias = 1.45;
let percepBienes = 1.25;



let nombreUser = prompt("Ingrese su nombre");
let nombreProducto = prompt("Ingrese el nombre del producto");

let precioLoc = parseInt(prompt("Ingrese el valor en $ARS del mercado local"));
precioLoc = chequearSiEsValorCorrecto(precioLoc, "$ARS", "mercado local")

let precioEnvioLoc = parseInt(prompt("Ingrese el valor en $ARS del envío local"));
precioEnvioLoc = chequearSiEsValorCorrecto(precioEnvioLoc, "$ARS", "envío local")

let precioExt = parseInt(prompt("Ingrese el valor en $USD del mercado exterior"));
precioExt = chequearSiEsValorCorrecto(precioExt, "$USD", "mercado exterior")

let precioEnvioExt = parseInt(prompt("Ingrese el valor en $USD del envío exterior"));
precioEnvioExt = chequearSiEsValorCorrecto(precioEnvioExt, "$USD", "envío exterior")

comparacionPrecios();



/* FUNCIONES */

function chequearSiEsValorCorrecto(precio, moneda, mensaje) {
    while (isNaN(precio) || precio <= 0) {
        precio = parseInt(prompt(`Error! Ingrese correctamente el valor en ${moneda} del ${mensaje}`));
    }
    return precio;
}

function comparacionPrecios() {
    let precioFinalLoc = precioLoc + precioEnvioLoc;
    let precioFinalExt;
    if ((precioExt + precioEnvioExt) < 300) {
        precioFinalExt = ((precioExt + precioEnvioExt) * impuestoPais * percepGanancias).toFixed(2);
    } else {
        precioFinalExt = ((precioExt + precioEnvioExt) * impuestoPais * percepGanancias * percepBienes).toFixed(2);
    }

    if (precioFinalLoc > precioFinalExt) {
        decisionFinal("exterior", precioFinalExt);
    } else if (precioFinalLoc < precioFinalExt) {
        decisionFinal("local", precioFinalLoc);
    } else {
        decisionFinal("igual", precioFinalLoc);
    }
}

function decisionFinal(mercado, precioFinal) {
    if (mercado == "local" || mercado == "exterior") {
        alert(`${nombreUser}, te conviene comprar tu ${nombreProducto} en el mercado ${mercado} con un precio total de $${precioFinal} ARS`);
    } else if (mercado == "igual") {
        alert(`${nombreUser}, tu ${nombreProducto} en el mercado local y exterior cuesta $${precioFinal} ARS. Decidí vos dónde comprarlo!`);
    }
}