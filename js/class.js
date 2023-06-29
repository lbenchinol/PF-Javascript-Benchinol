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