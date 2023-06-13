/*
BASE ESTILOS BS PARA AGREGAR PRODUCTOS
    <div class="row mb-1" >
        <p class="col m-0">NOMBRE PRODUCTO</p>
        <p class="col m-0 border-start border-end">PRECIO ARS</p>
        <p class="col m-0">PRECIO USD</p>
    </div>
/*

/*
ESTILOS VALIDACION BS EN LAS CLASS DE LOS inputs
    class="form-label is-valid"
    class="form-label is-invalid"
*/


/* VARIABLES GLOBALES */

const dolarOficial = 241.39;
const impuestoPais = 1.30;
const percepGanancias = 1.45;
const percepBienes = 1.25;

//			CONSTRUCTOR DE CADA PRODUCTO
class Producto {
    constructor(nombre, precioLoc, linkLoc, precioExt, linkExt) {
        this.nombre = nombre.toUpperCase();
        this.precioLoc = precioLoc;
        this.linkLoc = linkLoc;
        this.precioExt = precioExt;
        this.linkExt = linkExt;
    }
}

//			VARIABLE GLOBAL PARA DOM
const listaHTML = document.getElementById("lista");

//			ARRAY DE PRODUCTOS
const listaProductos = [];

//			ACTUALIZA LISTA DE PRODUCTOS
const actualizarLista = ()=>{
	listaHTML.innerHTML = "";
	listaProductos.forEach((producto)=>{
		const contenedor = document.createElement("div");
		contenedor.classList("row mb-1");
		
		const nombre = document.createElement("p");
		nombre.classList("col m-0");
		nombre.innerText = producto.nombre;
		
		const precioARS =  document.createElement("p");
		precioARS.classList("col m-0 border-start border-end");
		precioARS.innerText = producto.precioLoc;
		
		const precioUSD = document.createElement("p");
		precioUSD.classList("col m-0");
		precioUSD.innerText = producto.precioExt;
		
		const boton = document.createElement("button");
		boton.textContent = "Eliminar";
		boton.addEventListener("click", ()=>{
			eliminarDeLaLista(producto);
		});
		
		contenedor.appendChild(nombre);
		contenedor.appendChild(precioARS);
		contenedor.appendChild(precioUSD);
		contenedor.appendChild(boton);
		
		listaHTML.appendChild(contendor);
	});
}

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
listaProductos.push(new Producto(nombreProducto, precioLoc, linkLoc, precioExt, linkExt));
*/

/*
-----   ARREGLAR LOS AVISOS DE ALERT A MSJ EN DOM   -----
const decisionFinal = (mercado, precioFinal) => {
    const productos = listaProductos.reduce((prod, e) => prod + e.nombre + " ", "");
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

//			COMPARADOR DE PRECIOS Y ELECCION FINAL
function comparadorPrecios(decisionFinal) {
    let precioFinalLoc = listaProductos.reduce((total, e) => total + e.precioLoc, 0);
    // SUMAR A precioFinalLoc EL ENVIO LOCAL
    let precioFinalExt = listaProductos.reduce((total, e) => total + e.precioExt, 0);
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

//			FUNCION PARA AGREGAR CADA PRODUCTO
/*
nombreProducto
linkProdLocal
precioLocal
linkProdExterior
precioExterior

precioEnvioLoc
precioEnvioExt

btnCalcular
btnLimpiar
*/
function agregarProducto(){
	const nombreProducto = document.getElementById("nombreProducto");
	
	
	const linkProdLocal = document.getElementById("linkProdLocal");
	const precioLocal = document.getElementById("precioLocal");
	const linkProdExterior = document.getElementById("linkProdExterior");
	const precioExterior = document.getElementById("precioExterior");
}

//			CONFIGURACION DE ELEMENTOS DEL FORMULARIO
function configFormulario (){
	const botonAgregar = document.getElementById("btnAgregar");
	botonAgregar.addEventListener("click", ()=>{
			agregarProducto();
		});
}

configFormulario();