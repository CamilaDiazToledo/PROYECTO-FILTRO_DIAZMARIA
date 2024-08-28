function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("productos"));
    console.log(memoria)
    if(!memoria){
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("productos",JSON.stringify([nuevoProducto]))
    }else {
        const indiceProducto = memoria.findIndex(lubricante => lubricante.id === producto.id );
        console.log(indiceProducto);
        const nuevaMemoria = memoria;
        if(indiceProducto === -1){
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto));
        } else {
            nuevaMemoria[indiceProducto].cantidad ++;
        }
        localStorage.setItem("productos",JSON.stringify(nuevaMemoria))
    }
}


/*Toma un producto le agrega cantidad 1 y lo devuelva*/ 
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}