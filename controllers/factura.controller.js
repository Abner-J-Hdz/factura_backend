const Factura = require("../models/Factura");

exports.crearFactura = async (req, res) => {

    let { usuario, subtotal, total } = req.body;
    const date = new Date();

    if (!usuario || !subtotal || !total) {
        return res.status(400).json({message: "El usuario es oligatorio"});
    }

    try {
        const fact = new Factura(req.body);
        fact.fecha = date;
        await fact.save();

        res.json({message: "La factura se guardo correctamente", factura: fact});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Ocurrió un error',
            data: newFact
        });
    }
}

exports.obtenerFacturas = async (req, res) => {


    try {
        const populateArt = {path: 'detalles.articulo', select: 'nombre descripcion'};
        const fact =  await Factura.find().populate('Articulo');

        res.json({message: "Datos obtenidos", facturas: fact});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Ocurrió un error al obtener datos',
        });        
    }
}
/*
function getUserWithPosts(username){
    return User.findOne({ username: username })
      .populate('posts').exec((err, posts) => {
        console.log("Populated User " + posts);
      })
  }*/