// Suponiendo que ya tienes la función obtenerDatos() y crearTarjetasProductosInicio().

let productos = [];

async function obtenerDatos() {
    try {
        const respuesta = await fetch('Productos.json'); 
        if (!respuesta.ok) {
            throw new Error('No se pudo obtener el archivo JSON');
        }
        productos = await respuesta.json();
        crearTarjetasProductosInicio(productos); // Muestra todos los productos inicialmente
        agregarEventosFiltros();
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }
}

function crearTarjetasProductosInicio(productosFiltrados) {
    const contenedorTarjetas = document.getElementsByClassName("fotos_cat")[0];
    contenedorTarjetas.innerHTML = ''; // Limpia el contenedor antes de agregar nuevas tarjetas
    productosFiltrados.forEach(producto => {
        const nuevoLubricante = document.createElement("div");
        nuevoLubricante.classList.add("tarjeta_producto");
        nuevoLubricante.innerHTML = `
            <img src="${producto.img}" class="img_cat" alt="...">
            <h3 class="nombre_producto">${producto.nombre}</h3>
            <p class="descrip">${producto.descripcion}</p>
            <p class="precio">$${producto.precio.toLocaleString()}</p>
            <button class="button">Agregar</button>
        `;
        contenedorTarjetas.appendChild(nuevoLubricante);
        nuevoLubricante.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto));
    });
}

function agregarEventosFiltros() {
    document.getElementById('filtro-lubricante').addEventListener('click', () => filtrarProductos('Lubricante'));
    document.getElementById('filtro-multiorgasmos').addEventListener('click', () => filtrarProductos('Multiorgasmos'));
    document.getElementById('filtro-estrechante').addEventListener('click', () => filtrarProductos('Estrechante'));
    document.getElementById('filtro-aceite').addEventListener('click', () => filtrarProductos('Aceite'));
    document.getElementById('filtro-cuidado').addEventListener('click', () => filtrarProductos('Cuidado'));
    document.getElementById('filtro-todo').addEventListener('click', () => crearTarjetasProductosInicio(productos)); // Muestra todos los productos
}

function filtrarProductos(tipo) {
    const productosFiltrados = productos.filter(producto => producto.tipo === tipo);
    crearTarjetasProductosInicio(productosFiltrados);
}

// Llama a obtenerDatos para inicializar todo
obtenerDatos();
