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

//		ARRAY DE PRODUCTOS
const listaProductos = [];

//		ACTUALIZA LISTA DE PRODUCTOS
const actualizarLista = () => {
    const listaHTML = document.getElementById("lista");
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

//      FUNCION CHEQUEADOR URL
function validarURL(link) {
    try {
        const newUrl = new URL(link);
        return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch (err) {
        return false;
    }
}

//      FUNCION CHEQUEADOR DE VALORES
function checkValores(valor, tipo, region) {
    if (tipo == "nombre") {
        const nombreProducto = document.getElementById("nombreProducto");
        nombreProducto.classList.add("form-label");

        if (isNaN(valor)) {
            nombreProducto.classList.add("is-valid");
            return true;
        } else {
            nombreProducto.classList.add("is-invalid");
            return false;
        }

    } else if (tipo == "link") {
        const linkProd = document.getElementById(`linkProd${region}`);
        linkProd.classList.add("form-label");

        if (isNaN(valor) && validarURL(valor)) {
            linkProd.classList.add("is-valid");
            return true;
        } else {
            linkProd.classList.add("is-invalid");
            return false;
        }

    } else if (tipo == "precio") {
        const precioProd = document.getElementById(`precio${region}`);
        precioProd.classList.add("form-label");
        const spanPrecioProd = document.getElementById(`spanPrecio${region}`);
        spanPrecioProd.classList.add("form-label");

        if (!isNaN(valor) && valor >= 0) {
            precioProd.classList.add("is-valid");
            spanPrecioProd.classList.add("is-valid");
            return true;
        } else {
            precioProd.classList.add("is-invalid");
            spanPrecioProd.classList.add("is-invalid");
            return false;
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
    const nombreProducto = document.getElementById("nombreProducto");
    const linkProdLocal = document.getElementById("linkProdLocal");
    const precioLocal = document.getElementById("precioLocal");
    const spanPrecioLocal = document.getElementById("spanPrecioLocal");
    const linkProdExterior = document.getElementById("linkProdExterior");
    const precioExterior = document.getElementById("precioExterior");
    const spanPrecioExterior = document.getElementById("spanPrecioExterior");

    nombreProducto.value = "";
    nombreProducto.classList.remove("form-label");
    nombreProducto.classList.remove(`${nombreProducto.classList.contains("is-invalid") ? 'is-invalid' : 'is-valid'}`);
    linkProdLocal.value = "";
    linkProdLocal.classList.remove("form-label");
    linkProdLocal.classList.remove(`${linkProdLocal.classList.contains("is-invalid") ? 'is-invalid' : 'is-valid'}`);
    precioLocal.value = "";
    precioLocal.classList.remove("form-label");
    precioLocal.classList.remove(`${precioLocal.classList.contains("is-invalid") ? 'is-invalid' : 'is-valid'}`);
    spanPrecioLocal.classList.remove("form-label");
    spanPrecioLocal.classList.remove(`${spanPrecioLocal.classList.contains("is-invalid") ? 'is-invalid' : 'is-valid'}`);
    linkProdExterior.value = "";
    linkProdExterior.classList.remove("form-label");
    linkProdExterior.classList.remove(`${linkProdExterior.classList.contains("is-invalid") ? 'is-invalid' : 'is-valid'}`);
    precioExterior.value = "";
    precioExterior.classList.remove("form-label");
    precioExterior.classList.remove(`${precioExterior.classList.contains("is-invalid") ? 'is-invalid' : 'is-valid'}`);
    spanPrecioExterior.classList.remove("form-label");
    spanPrecioExterior.classList.remove(`${spanPrecioExterior.classList.contains("is-invalid") ? 'is-invalid' : 'is-valid'}`);
}

//      FUNCION PARA BORRAR COMPLETAMENTE TODO
const borrarTodo = () => {
    listaProductos = [];
    localStorage.clear();
    actualizarLista();
}

//	    FUNCION PARA AGREGAR CADA PRODUCTO
function agregarProducto() {
    const nombreProducto = document.getElementById("nombreProducto").value;
    const checkNombre = checkValores(nombreProducto, "nombre");
    const linkProdLocal = document.getElementById("linkProdLocal").value;
    const checkLinkLoc = checkValores(linkProdLocal, "link", "Local");
    const precioLocal = document.getElementById("precioLocal").value;
    const checkPrecioLoc = checkValores(precioLocal, "precio", "Local");
    const linkProdExterior = document.getElementById("linkProdExterior").value;
    const checkLinkExt = checkValores(linkProdExterior, "link", "Exterior");
    const precioExterior = document.getElementById("precioExterior").value;
    const checkPrecioExt = checkValores(precioExterior, "precio", "Exterior");

    if (checkNombre && checkLinkLoc && checkPrecioLoc && checkLinkExt && checkPrecioExt) {

        listaProductos.push(new Producto(nombreProducto, precioLocal, linkProdLocal, precioExterior, linkProdExterior));

        localStorage.clear();
        localStorage.setItem("listaProductos", JSON.stringify(listaProductos));
        actualizarLista();
        
        Toastify({
            text: `Producto agregado!`,
            duration: 3000,
            style: {
                background: "linear-gradient(90deg, rgba(0,63,8,1) 0%, rgba(17,153,11,1) 25%, rgba(17,153,11,1) 50%, rgba(17,153,11,1) 75%, rgba(0,63,8,1) 100%)",
            }
        }).showToast();

        limpiarForm();

    } else {
        swal.fire({
            title: `Error!`,
            text: `Hay uno o más errores en los datos anteriores. El producto no se agregó a la lista.`,
            icon: 'error',
            timer: 5000,
        });
    }
}

//      FUNCION ELIMINA PRODUCTO DE LA LISTA
function eliminarDeLaLista(producto) {
    const index = listaProductos.indexOf(producto);
    listaProductos.splice(index, 1);
    localStorage.clear();
    localStorage.setItem("listaProductos", JSON.stringify(listaProductos));
    actualizarLista();
}

//		CONFIGURACION DE ELEMENTOS DEL FORMULARIO
document.addEventListener("DOMContentLoaded", () => {

    // CHEQUEA ALMACENAMIENTO EN LOCAL STORAGE
    //listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    actualizarLista();

    // CONFIG PREVENT DEFAULT DEL FORM
    const formulario = document.getElementById("formularioProducto");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
    });
    const formularioEnvios = document.getElementById("formularioEnvios");
    formularioEnvios.addEventListener("submit", (e) => {
        e.preventDefault();
    });

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
});