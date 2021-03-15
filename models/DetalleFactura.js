const mongoose = require('mongoose');

const DetalleFacturaSchema = mongoose.Schema({
    id_factura:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Factura',
        required: true
    },
    id_articulo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articulo',
        required: true
    },
    cantidad:{
        type: Number,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    subtotal:{
        type: Number,
        required: true
    },
    impuesto: {
        type: Number,
        required: true
    },
    total:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('DetalleFactura', DetalleFacturaSchema);