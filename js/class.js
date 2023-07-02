//      VARIABLES GLOBALES
let dolarOficial;
const impuestoPais = 1.30;
const percepGanancias = 1.45;
const percepBienes = 1.25;

//		CONSTRUCTOR DE CADA PRODUCTO
class Producto {
    constructor(nombre, precioLoc, precioExt) {
        this.nombre = nombre.toUpperCase();
        this.precioLoc = precioLoc;
        this.precioExt = precioExt;
    }
}

//		ARRAY DE PRODUCTOS
const listaProductos = [];