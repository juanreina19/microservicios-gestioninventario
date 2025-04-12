const express = require('express');
const router = express.Router();
const controller = require('../controllers/productoController');

router.get('/', controller.obtenerProductos);
router.post('/', controller.registrarProducto);
router.put('/:codigo', controller.actualizarProducto);

module.exports = router;