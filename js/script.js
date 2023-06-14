//      VARIABLES GLOBALES
const dolarOficial = 249.13;
const impuestoPais = 1.30;
const percepGanancias = 1.45;
const percepBienes = 1.25;

//		CONSTRUCTOR DE CADA PRODUCTO
class Producto {
    constructor(nombre, precioLoc, linkLoc, precioExt, linkExt) {
        this.nombre = nombre.toUpperCase();
        this.precioLoc = precioLoc;
        this.linkLoc = linkLoc;
        this.precioExt = precioExt;
        this.linkExt = linkExt;
    }
}

//		VARIABLE GLOBAL PARA DOM
const listaHTML = document.getElementById("lista");

//		ARRAY DE PRODUCTOS
const listaProductos = [];

//		ACTUALIZA LISTA DE PRODUCTOS
const actualizarLista = () => {
    listaHTML.innerHTML = "";
    listaProductos.forEach((producto) => {
        const contenedor = document.createElement("div");
        contenedor.classList.add("row");
        contenedor.classList.add("mb-1");

        const nombre = document.createElement("p");
        nombre.classList.add("col");
        nombre.classList.add("m-0");
        nombre.innerText = producto.nombre;

        const precioARS = document.createElement("p");
        precioARS.classList.add("col");
        precioARS.classList.add("m-0");
        precioARS.classList.add("border-start");
        precioARS.classList.add("border-end");
        precioARS.innerText = producto.precioLoc;

        const precioUSD = document.createElement("p");
        precioUSD.classList.add("col");
        precioUSD.classList.add("m-0");
        precioUSD.innerText = producto.precioExt;

        const boton = document.createElement("button");
        boton.textContent = "Eliminar";
        boton.addEventListener("click", () => {
            eliminarDeLaLista(producto);
        });

        contenedor.appendChild(nombre);
        contenedor.appendChild(precioARS);
        contenedor.appendChild(precioUSD);
        contenedor.appendChild(boton);

        listaHTML.append(contenedor);
    });
}

//      FUNCION DECISION FINAL SEGUN EL CALCULO
//-----   ARREGLAR LOS AVISOS DE ALERT A MSJ EN DOM   -----
const decisionFinal = (mercado, precioFinal) => {
    if (mercado == "local") {
        swal.fire({
            title: `Cálculo terminado!`,
            text: `Te conviene comprar tus productos en el mercado local con un total de $${precioFinal} ARS`,
            icon: 'success', 
            timer: 5000,
            })
    } else if (mercado == "exterior") {
        swal.fire({
            title: `Cálculo terminado!`,
            text: `Te conviene comprar tus productos en el mercado exterior con un total de $${precioFinal} ARS`,
            icon: 'success', 
            timer: 5000,
            })
    } else if (mercado == "igual") {
        swal.fire({
            title: `Cálculo terminado!`,
            text: `Tus productos en el mercado local y exterior cuestan $${precioFinal} ARS. Decidí vos dónde comprarlos!`,
            icon: 'success', 
            timer: 5000,
            })
    }
}

//      FUNCION CHEQUEADOR DE VALORES
//-----   SACAR LOS PROMTS POR AVISOS EN EL DOM - NO DEVOLVER NADA
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

//		COMPARADOR DE PRECIOS Y ELECCION FINAL
function comparadorPrecios(decisionFinal) {
    let precioFinalLoc = listaProductos.reduce((total, e) => total + parseInt(e.precioLoc), 0);
    precioFinalLoc += parseInt(document.getElementById("precioEnvioLoc").value);
    let precioFinalExt = listaProductos.reduce((total, e) => total + parseInt(e.precioExt), 0);
    precioFinalExt += parseInt(document.getElementById("precioEnvioExt").value);

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

//      FUNCION PARA LIMPIAR TODO EL FORM LUEGO DE AGREGAR
const limpiarForm = () => {
    document.getElementById("nombreProducto").value = "";
    document.getElementById("linkProdLocal").value = "";
    document.getElementById("precioLocal").value = "";
    document.getElementById("linkProdExterior").value = "";
    document.getElementById("precioExterior").value = "";
}

const borrarTodo = () => {
    listaProductos = [];
    // BORRAR LOCAL STORAGE
    actualizarLista();
}

//	    FUNCION PARA AGREGAR CADA PRODUCTO
function agregarProducto() {
    const nombreProducto = document.getElementById("nombreProducto").value;
    // CHECKEADOR IF nombreProducto == "" => mostrar error y break;
    const linkProdLocal = document.getElementById("linkProdLocal").value;
    const precioLocal = document.getElementById("precioLocal").value;
    const linkProdExterior = document.getElementById("linkProdExterior").value;
    const precioExterior = document.getElementById("precioExterior").value;

    listaProductos.push(new Producto(nombreProducto, precioLocal, linkProdLocal, precioExterior, linkProdExterior));

    actualizarLista();
    limpiarForm();
}

//      FUNCION ELIMINA PRODUCTO DE LA LISTA
function eliminarDeLaLista(producto) {
    const index = listaProductos.indexOf(producto);
    listaProductos.splice(index, 1);
    actualizarLista();
}

//		CONFIGURACION DE ELEMENTOS DEL FORMULARIO
function configFormulario() {
    // CONFIG PREVENT DEFAULT DEL FORM
    const formulario = document.getElementById("formularioProducto");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
    })
    const formularioEnvios = document.getElementById("formularioEnvios");
    formularioEnvios.addEventListener("submit", (e) => {
        e.preventDefault();
    })

    // CONFIG BOTON "AGREGAR"
    const botonAgregar = document.getElementById("btnAgregar");
    botonAgregar.addEventListener("click", () => {
        agregarProducto();
    });

    // CONFIG BOTON "CALCULAR"
    const botonCalcular = document.getElementById("btnCalcular");
    botonCalcular.addEventListener("click", () => {
        // --- FALTA AGREGAR CHEQUEADOR POR CADA INPUT DE ENVIOS
        comparadorPrecios(decisionFinal);
    });

    // CONFIG BOTON "LIMPIAR"
    const botonLimpiar = document.getElementById("btnLimpiar");
    botonLimpiar.addEventListener("click", () => {
        borrarTodo();
    });

}

configFormulario();


/*
ESTILOS VALIDACION BS EN LAS CLASS DE LOS inputs
    class="form-label is-valid"
    class="form-label is-invalid"
*/