// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("productos")) || [];
    const indiceProducto = memoria.findIndex(lubricante => lubricante.id === producto.id);

    if (indiceProducto === -1) {
        memoria.push(getNuevoProductoParaMemoria(producto));
    } else {
        memoria[indiceProducto].cantidad++;
    }

    localStorage.setItem("productos", JSON.stringify(memoria));
    actualizarNumeroCarrito();
    actualizarCarritoUI();
    cantidadTotal();
}


// Función para agregar cantidad a un producto y devolverlo
function getNuevoProductoParaMemoria(producto) {
    const nuevoProducto = { ...producto };  
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

// Actualiza el número total de productos en el carrito
function actualizarNumeroCarrito() {
    const memoria = JSON.parse(localStorage.getItem("productos")) || [];
    const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    document.getElementById("cuenta_carrito").innerText = cuenta;
}

// Actualiza la UI del carrito
function actualizarCarritoUI() {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const contenedorTarjetas = document.getElementById("container_carrito");
    
    contenedorTarjetas.innerHTML = "";
    
    if (productos.length > 0) {
        productos.forEach(producto => {
            let tarjeta = document.getElementById(`producto-${producto.id}`);
            if (!tarjeta) {
                tarjeta = document.createElement("div");
                tarjeta.id = `producto-${producto.id}`;
                tarjeta.classList.add("tarjeta_producto");
                contenedorTarjetas.append(tarjeta);
            }
            
            tarjeta.innerHTML = `
                <img src="${producto.img}" class="img_cat" alt="...">
                <h3 class="nombre_producto">${producto.nombre}</h3>
                <p class="descrip">${producto.descripcion}</p>
                <p class="precio">$${(producto.precio * producto.cantidad).toLocaleString()}</p>
                <div class="mas_menos">
                    <button class="button1" onclick="restarProducto(${producto.id})">-</button>
                    <span>${producto.cantidad}</span>
                    <button class="button1" onclick="agregarProducto(${producto.id})">+</button>
                </div>
            `;
        });
    } else {
        contenedorTarjetas.innerHTML = `<h3 class="Carrito_Vacio">No hay productos</h3>`;
    }
    
    PrecioTotal();
    cantidadTotal();
    Nombres();
}

// Función para restar productos del carrito
function restarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("productos")) || [];
    const indiceProducto = memoria.findIndex(lubricante => lubricante.id === producto.id);

    if (indiceProducto !== -1) {
        if (memoria[indiceProducto].cantidad > 1) {
            memoria[indiceProducto].cantidad--;
        } else {
            memoria.splice(indiceProducto, 1);
        }
        localStorage.setItem("productos", JSON.stringify(memoria));
        actualizarCarritoUI();
        actualizarNumeroCarrito();
        cantidadTotal(); 
    }
}

// Función para calcular y mostrar el precio total
function PrecioTotal() {
    const memoria = JSON.parse(localStorage.getItem("productos")) || [];
    const precio = document.querySelector("#precio");
    const total = memoria.reduce((acum, producto) => acum + (producto.cantidad * producto.precio), 0);
    precio.textContent = total.toLocaleString();
}

// Función para calcular y mostrar la cantidad total de productos
function cantidadTotal() {
    const memoria = JSON.parse(localStorage.getItem("productos")) || [];
    const cantidad = document.querySelector("#unidades");
    const totalCantidad = memoria.reduce((acum, producto) => acum + producto.cantidad, 0);
    cantidad.textContent = totalCantidad;
}

// Función para resetear el carrito
function reset() {
    localStorage.removeItem("productos");
    actualizarCarritoUI();
    actualizarNumeroCarrito(); 
    cantidadTotal(); 
}

// Función para procesar el pago
async function pagar() {
    const memoria = JSON.parse(localStorage.getItem("productos")) || [];
    if (memoria.length > 0) {
        alert("¡Gracias por tu compra!");
        localStorage.removeItem("productos");
        actualizarCarritoUI();
        actualizarNumeroCarrito(); 
        cantidadTotal(); 
    } else {
        document.querySelector("#container_carrito").innerHTML = `<h3 class="No hay Elementos</h3>`;
    }
}

// Función para mostrar los nombres de los productos en la lista
function Nombres() {
    const memoria = JSON.parse(localStorage.getItem("productos")) || [];
    const listado = document.querySelector("#lista");
    const padre = document.querySelector("#contnedor_lista");
    padre.innerHTML = "";

    if (memoria.length > 0) {
        memoria.forEach((element) => {
            const minipadre = document.createElement("div");
            const listas = document.createElement("p");
            const precios = document.createElement("p");
            listas.classList.add("palabra_cantidad");
            precios.classList.add("palabra_cantidad");
            minipadre.classList.add("listacarrito");
            listas.textContent = element.nombre;
            precios.textContent = `$${(element.precio * element.cantidad).toLocaleString()}....X${element.cantidad}`;
            minipadre.append(listas);
            minipadre.append(precios);
            padre.append(minipadre);
        });
    }
}

// Funciones asíncronas para manejar los eventos
async function agregarProducto(id) {
    const producto = JSON.parse(localStorage.getItem("productos")).find(p => p.id === id);
    if (producto) {
        await agregarAlCarrito(producto);
    }
}

async function restarProducto(id) {
    const producto = JSON.parse(localStorage.getItem("productos")).find(p => p.id === id);
    if (producto) {
        await restarAlCarrito(producto);
    }
}

async function procesarPago() {
    await pagar();
}

// Inicialización al cargar la página
window.onload = () => {
    actualizarCarritoUI();
    actualizarNumeroCarrito();
    cantidadTotal(); 
};

// Event listeners para los botones de pagar y vaciar carrito
document.querySelector("#reiniciar").addEventListener("click", reset);
document.querySelector("#pagar").addEventListener("click", procesarPago);
