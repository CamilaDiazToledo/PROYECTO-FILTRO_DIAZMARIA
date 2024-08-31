async function obtenerDatos() {
    try {
        const respuesta = await fetch('Productos.json'); 
        if (!respuesta.ok) {
            throw new Error('No se pudo obtener el archivo JSON');
        }
        const datos = await respuesta.json();
        crearTarjetasProductosInicio(datos); 
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }
}

function crearTarjetasProductosInicio(productos){
    const contenedorTarjetas = document.getElementsByClassName("fotos_cat")[0];
    productos.forEach(producto => {
        const nuevoLubricante = document.createElement("div");
        nuevoLubricante.classList.add("tarjeta_producto");
        nuevoLubricante.innerHTML = `
            <img src="${producto.img}" class="img_cat" alt="...">
            <h3 class="nombre_producto">${producto.nombre}</h3>
            <p class="descrip">${producto.descripcion}</p>
            <p class="precio">${producto.precio}</p>
            <button class="button">Comprar</button>
        `;
        contenedorTarjetas.appendChild(nuevoLubricante);
        nuevoLubricante.getElementsByTagName("button")[0].addEventListener("click",()=>agregarAlCarrito(producto))
    });
}


obtenerDatos();