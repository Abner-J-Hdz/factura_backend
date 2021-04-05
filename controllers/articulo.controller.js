
const Articulo = require("../models/Articulo");

exports.crearArticulo = async (req, res) => {
    const { codigo, nombre, descripcion, precio, costo, activo } = req.body;
    
    if( !codigo || !nombre || !precio || !costo ){
        return res.status(400).json({
            message: 'Código, Nombre, Precio y Costo son campos obligatorios'
        });
    }

    const numbChar = codigo.length;

    if(numbChar !== 13){
        return res.status(400).json({
            message: 'El campo código debe tener 13 caracteres'
        });        
    }

    try {
        let articulo = await Articulo.findOne({ codigo });
        console.log(articulo);
        if(articulo){
            return res.status(400).json({ message: `El codigo ${codigo} ya existe`});
        }
        
        articulo = new Articulo(req.body);
        articulo.activo = true;
        articulo.save();

        return res.status(201).json({ message: `El articulo ${nombre} se guardó correctamente`});
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: `Error de servidor`});
    }
}

exports.obtenerArticuloActivos = async (req, res) => {
    try {
        
        let codigo = req.params.codigo;

        if(codigo){
            var regexp = new RegExp("^" + codigo);
            let articulos = await Articulo.find({ activo: true, codigo: regexp  }).limit(5);
    
            return res.json({ articulos, message: "OK" });
        }
        else{
            return res.json({ articulos:[] });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error de servidor'});
    }
}

exports.obtenerArticulos = async (req, res) => {
    const { search = '', criterioSearch = 'nombre' } = req.query;
    console.log(criterioSearch)             
    try{
       let articulos;
        if(!search){
           articulos = await Articulo.find();
        }else{
            var regexp = new RegExp("^" + search);
            
            if(criterioSearch.toLowerCase() === 'nombre' || !criterioSearch){
                articulos = await Articulo.find({ nombre: regexp});
            }
            if(criterioSearch.toLowerCase() === 'codigo'){
                articulos = await Articulo.find({ codigo: regexp});
            }
        }
        //let longitudArray = articulos.length;message: longitudArray > 0 ? "ok" : "No se encontro articulo"
        return res.json({ articulos  });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error de servidor'});
    }
}


exports.obtenerUnArticulo = async(req, res) => {
    const idArticulo = req.params.id;

    try {
        const articulo = await Articulo.findById(idArticulo);

        if(!articulo) res.json({ message: "No existe articulo"});

        return res.json({messaje: "Dato encontrado", articulo})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erro deservidor"});
    }
}

exports.editarArticulo = async(req, res) => {

    const idArticulo = req.params.id;

    //validamos
    const { codigo, nombre, descripcion, precio, costo, activo } = req.body;
    
    if( !codigo || !nombre || !precio || !costo ){
        return res.status(400).json({
            message: 'Código, Nombre, Precio y Costo son campos obligatorios'
        });
    }

    const numbChar = codigo.length;

    if(numbChar !== 13){
        return res.status(400).json({
            message: 'El campo código debe tener 13 caracteres'
        });        
    }
    
    let nuevoArticulo;
    try {
        let articulo = await Articulo.findById(idArticulo);
        
        if(!articulo) res.status(404).json({ message: "No existe articulo"});
        //validacion  para no tener error con el codigo que es unico
        if(articulo.codigo == codigo){
            nuevoArticulo = { nombre, descripcion, precio, costo, activo };
        }else{
            nuevoArticulo = req.body;
        }

       articulo = await Articulo.findByIdAndUpdate({_id: idArticulo }, {$set: nuevoArticulo });
       res.json({ message: `El articulo ${nuevoArticulo.nombre} ha sido actualizado correctamente`});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error deservidor"});
    }   
}

exports.eliminarArticulo = async(req, res) => {
    const idArticulo = req.params.id;
    
    try {
        let articulo = await Articulo.findById(idArticulo);
    
        if(!articulo) return res.status(404).json({ message: 'El articulo que desea eliminar no existe'});

        await Articulo.findByIdAndRemove(idArticulo);
        
        res.json({ message: `El articulo ${articulo.nombre} ha sido eliminado correctamente`});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error deservidor"});
    }
}
