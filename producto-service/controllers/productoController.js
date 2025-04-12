const fs = require('fs');
const path = require('path');
const { calcularValorTotal } = require('../utils/httpClient');
const productosPath = path.join(__dirname, '../data/productos.json');

function leerProductos() {
    try {
        if (!fs.existsSync(productosPath)) return [];
        const data = fs.readFileSync(productosPath, 'utf8');
        const productos = JSON.parse(data);
        return Array.isArray(productos) ? productos : [];
    } catch (error) {
        console.error('Error al leer productos:', error.message);
        return [];
    }
}
function guardarProductos(productos) {
    fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2));
}

exports.registrarProducto = async (req, res) => {
    const { codigo, nombre, precio, cantidad } = req.body;
    const productos = leerProductos();

    if (productos.find(p => p.codigo === codigo)) {
        return res.status(400).json({ error: 'Código ya registrado' });
    }

    const valor_total = await calcularValorTotal(precio, cantidad);
    const nuevoProducto = { codigo, nombre, precio, cantidad, valor_total };
    productos.push(nuevoProducto);
    guardarProductos(productos);
    res.status(201).json(nuevoProducto);
};

exports.obtenerProductos = (req, res) => {
    res.json(leerProductos());
};

exports.actualizarProducto = async (req, res) => {
    const { codigo } = req.params;
    const { nombre, precio, cantidad } = req.body;
    const productos = leerProductos();
    const index = productos.findIndex(p => p.codigo === codigo);

    if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });

    productos[index] = {
        ...productos[index],
        nombre: nombre || productos[index].nombre,
        precio: precio !== undefined ? precio : productos[index].precio,
        cantidad: cantidad !== undefined ? cantidad : productos[index].cantidad,
    };
    productos[index].valor_total = await calcularValorTotal(productos[index].precio, productos[index].cantidad);
    guardarProductos(productos);
    res.json(productos[index]);
};