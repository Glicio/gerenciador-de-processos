const mongoose = require("mongoose")

const ControladorSchema = new mongoose.Schema({
    nome: {
        type: String
    },
    cpf: {
        type: String,
    },
    cargo: {
        type: String,
    }
})

module.exports = ControladorSchema