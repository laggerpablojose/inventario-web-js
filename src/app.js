const form = document.querySelector("#form-producto");
const inputNombre = document.querySelector("#nombre");
const inputPrecio = document.querySelector("#precio");
const inputStock = document.querySelector("#stock");
const tablaProductos = document.querySelector("#tabla-productos");
const STOCK_MINIMO = 5;

let productos = leerDeLS();

function leerDeLS() {
    const datos = localStorage.getItem("productos");
    return datos ? JSON.parse(datos) : [];
}

function guardarEnLS() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function renderProductos() {
    tablaProductos.innerHTML = "";

    productos.forEach((producto) => {

        let claseStock = "";

        if (producto.stock === 0) {
            claseStock = "sin-stock";
        } else if (producto.stock <= STOCK_MINIMO) {
            claseStock = "stock-bajo";
        }

        const fila = document.createElement("tr");

        if (producto.stock === 0) {
            fila.classList.add("sin-stock-row");
        }

        fila.innerHTML = `
      <td>${producto.nombre}</td>

      <td>${producto.precio}</td>

      <td class="${claseStock}">
        ${producto.stock === 0 ? "SIN STOCK" : producto.stock}
      </td>

      <td>
        <button onclick="actualizarStock(${producto.id},1)">+</button>
        <button onclick="actualizarStock(${producto.id},-1)">-</button>
      </td>
    `;

        tablaProductos.appendChild(fila);
    });
}

function agregarProducto(event) {
    event.preventDefault();

    const nombre = inputNombre.value.trim();
    const precio = Number(inputPrecio.value);
    const stock = Number(inputStock.value);

    if (nombre === "" || precio < 0 || stock < 0) {
        alert("Datos inválidos");
        return;
    }

    const producto = {
        id: Date.now(),
        nombre,
        precio,
        stock
    };

    productos.push(producto);
    guardarEnLS();
    renderProductos();
    form.reset();
}

function actualizarStock(id, delta) {
    const producto = productos.find(
        p => p.id === id
    );

    if (!producto) return;

    if (producto.stock + delta < 0) {
        alert("No puede quedar negarivo");
        return;
    }

    producto.stock += delta;

    guardarEnLS();

    renderProductos();
}

function eliminarProducto() {

}

form.addEventListener("submit", agregarProducto);
renderProductos();