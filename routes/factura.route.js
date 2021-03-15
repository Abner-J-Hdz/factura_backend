const express = require("express");
const router = express.Router();

const FacturaController = require("../controllers/factura.controller");

router.post('/', FacturaController.crearFactura);
router.get('/', FacturaController.obtenerFacturas);

module.exports = router