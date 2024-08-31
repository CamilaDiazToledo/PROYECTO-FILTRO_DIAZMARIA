function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("productos"));
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
    actualizarNumeroCarrito()
}


/*Toma un producto le agrega cantidad 1 y lo devuelva*/ 
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

const cuentaCarritoElement = document.getElementById("cuenta_carrito"); 
function actualizarNumeroCarrito(){
    const memoria = JSON.parse(localStorage.getItem("productos"));
    const cuenta = memoria.reduce((acum, current) => acum+current.cantidad,0)
    cuentaCarritoElement.innerText = cuenta;
}



function crearTarjetasProductosInicio1(){
    const productos1 = JSON.parse(localStorage.getItem("productos"));
    console.log(productos1)
    if(productos1 && productos1.length > 0){
        const contenedorTarjetas1 = document.getElementById("container_carrito");
        productos1.forEach((producto) => {
            console.log = (producto);
            let nuevoLubricante = document.createElement("div");
            nuevoLubricante.classList.add("tarjeta_producto");
            nuevoLubricante.innerHTML = `
                <img src="${producto.img}" class="img_cat" alt="...">
                <h3 class="nombre_producto">${producto.nombre}</h3>
                <p class="descrip">${producto.descripcion}</p>
                <p class="precio">$${producto.precio}</p>
                <div class="mas_menos">
                <button class="button1">+</button>
                <span>0</span>
                <button class="button1">-</button>
                </div>
            `;
            contenedorTarjetas1.append(nuevoLubricante);
        });
    }
}

crearTarjetasProductosInicio1()
actualizarNumeroCarrito();
//actualizarNumeroCarrito();


// function crearTarjetasProductosInicio(productos){
//     const productos1 = JSON.parse(localStorage.getItem("productos"));
//     console.log(productos1)
//     if(productos1 && productos1.length > 0){
//         const contenedorTarjetas = document.getElementsByClassName("fotos_cat")[0];
//         productos1.forEach(producto => {
//             const nuevoLubricante = document.createElement("div");
//             nuevoLubricante.classList.add("tarjeta_producto");
//             nuevoLubricante.innerHTML = `
//                 <img src="${producto.img}" class="img_cat" alt="...">
//                 <h3 class="nombre_producto">${producto.nombre}</h3>
//                 <p class="descrip">${producto.descripcion}</p>
//                 <p class="precio">${producto.precio}</p>
//                 <button class="button">Comprar</button>
//             `;
//             contenedorTarjetas.appendChild(nuevoLubricante);
//             nuevoLubricante.getElementsByTagName("button")[0].addEventListener("click",()=>agregarAlCarrito(producto))
//     });
//     }
    
// }





