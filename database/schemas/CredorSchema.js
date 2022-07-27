const mongoose = require("mongoose")

const CredorSchema = new mongoose.Schema({
    nome: {
        type: String
    },
    cnpj: {
        type: String,
    },
    tipo: {
        type: String,
    },
    cpf: {
        type: String,
    }
})

module.exports = CredorSchema