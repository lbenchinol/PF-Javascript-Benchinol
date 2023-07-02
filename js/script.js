//		ACTUALIZA LISTA DE PRODUCTOS
const actualizarLista = () => {
    const listaHTML = document.getElementById("lista");
    listaHTML.innerHTML = "";
    listaProductos.forEach((producto) => {
        const contenedor = document.createElement("div");
        contenedor.classList.add("row");
        contenedor.classList.add("mb-1");

        const nombre = document.createElement("p");
        nombre.classList.add("col-5");
        nombre.classList.add("m-0");
        nombre.innerText = producto.nombre;

        const precioARS = document.createElement("p");
        precioARS.classList.add("col-3");
        precioARS.classList.add("m-0");
        precioARS.classList.add("border-start");
        precioARS.classList.add("border-end");
        precioARS.innerText = producto.precioLoc;

        const precioUSD = document.createElement("p");
        precioUSD.classList.add("col-3");
        precioUSD.classList.add("m-0");
        precioUSD.innerText = producto.precioExt;

        const boton = document.createElement("i");
        boton.classList.add("col-1");
        boton.classList.add("bi");
        boton.classList.add("bi-x-circle");
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

//      FUNCION MENSAJE DECISION FINAL SEGUN EL CALCULO
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

    } else if (tipo == "envio") {
        const envio = document.getElementById(`precioEnvio${region}`);
        envio.classList.add("form-label");
        const spanEnvio = document.getElementById(`spanPrecioEnvio${region}`);
        spanEnvio.classList.add("form-label");
        if (!isNaN(valor) && valor >= 0) {
            envio.classList.add("is-valid");
            spanEnvio.classList.add("is-valid");
            return true;
        } else {
            envio.classList.add("is-invalid");
            spanEnvio.classList.add("is-invalid");
            return false;
        }
    }
}

//		FUNCION CALCULO COMPARADOR DE PRECIOS
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
    limpiarEnvio();
}

//      FUNCION CHEQUEAR SI DEBE CALCULAR
function checkCalcular() {
    const envioLocal = document.getElementById("precioEnvioLoc");
    const envioExterior = document.getElementById("precioEnvioExt");
    const checkLoc = checkValores(envioLocal.value, "envio", "Loc");
    const checkExt = checkValores(envioExterior.value, "envio", "Ext");
    if (checkLoc && checkExt) {
        return true;
    } else {
        swal.fire({
            title: `Error!`,
            text: `Hay uno o más errores en los datos anteriores. No se pudo calcular.`,
            icon: 'error',
            timer: 5000,
        });
        return false;
    }
}

//      FUNCION GLOBAL PARA LIMPIAR INPUTS
const limpiarGlobal = (nodo) => {
    if (nodo.classList.contains("form-label")) {
        nodo.classList.remove("form-label");
    }
    if (nodo.classList.contains("is-invalid")) {
        nodo.classList.remove("is-invalid");
    }
    if (nodo.classList.contains("is-valid")) {
        nodo.classList.remove("is-valid");
    }
}

//      FUNCION PARA LIMPIAR TODO EL FORM LUEGO DE AGREGAR
const limpiarForm = () => {
    const nombreProducto = document.getElementById("nombreProducto");
    const precioLocal = document.getElementById("precioLocal");
    const spanPrecioLocal = document.getElementById("spanPrecioLocal");
    const precioExterior = document.getElementById("precioExterior");
    const spanPrecioExterior = document.getElementById("spanPrecioExterior");

    nombreProducto.value = "";
    limpiarGlobal(nombreProducto);
    precioLocal.value = "";
    limpiarGlobal(precioLocal);
    limpiarGlobal(spanPrecioLocal);
    precioExterior.value = "";
    limpiarGlobal(precioExterior);
    limpiarGlobal(spanPrecioExterior);
}

//      FUNCION LIMPIAR CONTENIDO INPUTS ENVIOS
const limpiarEnvio = () => {
    const envioLocal = document.getElementById("precioEnvioLoc");
    const spanEnvioLocal = document.getElementById("spanPrecioEnvioLoc");
    const envioExterior = document.getElementById("precioEnvioExt");
    const spanEnvioExterior = document.getElementById("spanPrecioEnvioExt");

    envioLocal.value = "";
    limpiarGlobal(envioLocal);
    limpiarGlobal(spanEnvioLocal);
    envioExterior.value = "";
    limpiarGlobal(envioExterior);
    limpiarGlobal(spanEnvioExterior);
}

//      FUNCION PARA BORRAR COMPLETAMENTE TODO
const borrarTodo = () => {
    while (listaProductos.length > 0) {
        listaProductos.pop();
    }
    localStorage.removeItem("listaProductos");
    actualizarLista();
}

//	    FUNCION PARA AGREGAR CADA PRODUCTO
function agregarProducto() {
    const nombreProducto = document.getElementById("nombreProducto").value;
    const checkNombre = checkValores(nombreProducto, "nombre");
    const precioLocal = document.getElementById("precioLocal").value;
    const checkPrecioLoc = checkValores(precioLocal, "precio", "Local");
    const precioExterior = document.getElementById("precioExterior").value;
    const checkPrecioExt = checkValores(precioExterior, "precio", "Exterior");

    if (checkNombre && checkPrecioLoc && checkPrecioExt) {

        listaProductos.push(new Producto(nombreProducto, precioLocal, precioExterior));

        localStorage.removeItem("listaProductos");
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
    localStorage.removeItem("listaProductos");
    localStorage.setItem("listaProductos", JSON.stringify(listaProductos));
    actualizarLista();
}

//      FUNCION CHEQUEA ALMACENAMIENTO EN LOCAL STORAGE
const checkLS = () => {
    const LS = JSON.parse(localStorage.getItem("listaProductos"));
    for (let i = 0; i < LS.length; i++) {
        listaProductos.push(LS[i]);
    }
    actualizarLista();
}

//      OBTIENE INFO DOLAR DE API DOLARSI
function actualizarValorDolar() {
    fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
        .then((resp) => resp.json())
        .then((respObj) => respObj[0])
        .then((obj) => obj.casa)
        .then((data) => {
            const dataOk = data.venta.replace(",",".")

            dolarOficial = Number(dataOk);

            const valorDolar = document.getElementById("valorDolar");
            valorDolar.innerText = dolarOficial;
        });
}


//	    CONFIGURACION DE ELEMENTOS DEL FORMULARIO
document.addEventListener("DOMContentLoaded", () => {

    // CHEQUEA ALMACENAMIENTO EN LOCAL STORAGE
    checkLS();

    //  ACTUALIZA VALOR DOLAR
    actualizarValorDolar();

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
        if (checkCalcular()) {
            comparadorPrecios(decisionFinal);
        }
    });

    // CONFIG BOTON "LIMPIAR"
    const botonLimpiar = document.getElementById("btnLimpiar");
    botonLimpiar.addEventListener("click", () => {
        borrarTodo();
        limpiarForm();
        limpiarEnvio();
    });
});