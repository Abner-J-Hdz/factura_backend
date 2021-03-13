const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const connectDB = require("./db")

//Creacion del servidor
const app = express();
app.use(morgan('dev'));
app.use(cors());

//para que entienda json
app.use(express.json({extended: true}));

//conectar a la base datos
connectDB();

//Puerto de la app
const PORT = process.env.PORT || 4002;

//importacion de rutas
const ArticuloRoute = require('./routes/articulo.route');

//Rutas
app.use('/api/articulo', ArticuloRoute);


//Arrancar la appp
app.listen(PORT, () => {
    console.log("##################################");
    console.log(`# Server is running in port ${PORT} #`);
    console.log("##################################");
})