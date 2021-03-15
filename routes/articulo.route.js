const express = require("express");
const router = express.Router();

const ArticuloController = require("../controllers/articulo.controller");

router.post('/', ArticuloController.crearArticulo);
router.get('/activos/:codigo', ArticuloController.obtenerArticuloActivos);
router.get('/', ArticuloController.obtenerArticulos);
router.get('/:id',ArticuloController.obtenerUnArticulo);
router.put('/:id', ArticuloController.editarArticulo);
router.delete('/:id', ArticuloController.eliminarArticulo);

module.exports = router