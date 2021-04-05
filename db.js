const mongoose = require("mongoose")
require('dotenv').config({path: 'variables.env'})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO,{
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useNewUrlParser: true
        })
        console.log("##################################");
        console.log(`##### Database  is connected #####`);
        console.log("##################################");
    } catch (error) {
        console.log(`Ocurrió un erro al conecta la base de datos... ${error}`);
        process.exit(1);
    }

}

module.exports = connectDB;