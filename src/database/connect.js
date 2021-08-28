const config = require("../../config.js");
const mongoose = require("mongoose")

module.exports = async () => {
    mongoose.connect(config.bot.mongourl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false
    }).then(() => {
    console.log("[botcity.xyz]: Mongoose conectado correctamente.");
    }).catch(err => console.log("[botcity.xyz]: Se produjo un error al conectar con Mongoose.", err));
}