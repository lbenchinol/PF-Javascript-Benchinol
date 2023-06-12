/* VARIABLES GLOBALES */

const dolarOficial = 241.39;
const impuestoPais = 1.30;
const percepGanancias = 1.45;
const percepBienes = 1.25;

class Producto {
    constructor(nombre, precioLoc, linkLoc, precioExt, linkExt) {
        this.nombre = nombre.toUpperCase();
        this.precioLoc = precioLoc;
        this.linkLoc = linkLoc;
        this.precioExt = precioExt;
        this.linkExt = linkExt;
    }
}

const arrayProductos = [];

/*
-----   CREAR NUEVO INPUT DE USER NAME  -----
let nombreUser = prompt("Ingrese su nombre");
*/

/*
-----   CREAR NUEVOS INPUTS PARA CADA SITUACION     -----
        PONER EVENT LISTENERS EN CADA SITUACION EN EL FOCUS DE LAS INPUTS (CUANDO SAQUEN EL FOCUS)
let nombreProducto;

let precioLoc;
precioLoc = chequearSiEsValorCorrecto(precioLoc, "producto");

let linkLoc = parseInt(prompt("Ingrese el valor en $ARS del envío local"));

let precioExt;
precioExt = chequearSiEsValorCorrecto(precioExt, "producto");

let linkExt;

*/

/*
-----   ANTES DEL PUSH, AGREGAR TAMBIEN EN EL DOM   -----
arrayProductos.push(new Producto(nombreProducto, precioLoc, linkLoc, precioExt, linkExt));
*/

/*
-----   ARREGLAR LOS AVISOS DE ALERT A MSJ EN DOM   -----
const decisionFinal = (mercado, precioFinal) => {
    const productos = arrayProductos.reduce((prod, e) => prod + e.nombre + " ", "");
    if (mercado == "local" || mercado == "exterior") {
        alert(`${nombreUser}, te conviene comprar tus ${productos} en el mercado ${mercado} con un precio total de $${precioFinal} ARS`);
    } else if (mercado == "igual") {
        alert(`${nombreUser}, tus productos en el mercado local y exterior cuestan $${precioFinal} ARS. Decidí vos dónde comprarlos!`);
    }
}
*/

/*
-----   AGREGAR FUNCION A EVENT LISTENER DE BOTON "CALCULAR" Y TOMAR LOS VALORES DE ENVIOS LOC Y EXT    -----
comparadorPrecios(decisionFinal);
*/

/* FUNCIONES */

/*
-----   SACAR LOS PROMTS POR AVISOS EN EL DOM - NO DEVOLVER NADA
function chequearSiEsValorCorrecto(chequear, tipo) {
    if (tipo == "producto" || tipo == "envio") {
        while (isNaN(chequear) || chequear < 0) {
            
        }

    } else if(tipo == "link") {
        // Hacer check segun propiedades de LINK (www, .com, etc)
        while (isNaN(chequear) || chequear <= 0) {

        }
    }
}
*/

function comparadorPrecios(decisionFinal) {
    let precioFinalLoc = arrayProductos.reduce((total, e) => total + e.precioLoc, 0);
    // SUMAR A precioFinalLoc EL ENVIO LOCAL
    let precioFinalExt = arrayProductos.reduce((total, e) => total + e.precioExt, 0);
    // SUMAR A precioFinalExt EL ENVIO EXTERIOR

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