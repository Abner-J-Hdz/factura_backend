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
    },
   detalles: [{
           id_articulo:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Articulo',
                required: true
            },
           nombre: {
               type: String,
               required: true
           },
           cantidad: {
               type: String,
               required: true
           },
           precio: {
               type: String,
               required: true
           },
           subtotalArt: {
                type: Number,
                required: true
           },
           impuestoArt: {
                type: Number,
                required: true               
           },
           totalArt:{
                type: Number,
                required: true
           }
       }
   ]
    
})

module.exports = mongoose.model('Factura', FacturaSchema);
