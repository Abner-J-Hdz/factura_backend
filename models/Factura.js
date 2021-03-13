const mongoose = require('mongoose');

const FacturaSchema = mongoose.Schema({
    fecha: Date,
    usuario: {
        type: String,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    impuesto:{
        type: Number,
        required: true
    },
    total:{
        type: Number,
        required: true
    }
    
})

module.exports = mongoose.model('Factura', FacturaSchema);
