const mongoose =  require('mongoose');

const Articulo_Schema = mongoose.Schema({
    codigo: {
        type: Number,
        required: true,
        trim:true,
        unique: true
    },
    descripcion:{
        type: String,
    },
    precio: {
        type: Number,
        required: true,
    },
    costo: {
        type: Number,
        required: true,
    },
    activo: Boolean
    
});

module.exports = mongoose.model('Articulo', Articulo_Schema);
