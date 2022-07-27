const mongoose = require("mongoose")


const ProcessoSchema = new mongoose.Schema({
    credor: {
        cnpj: String,
        cpf: String,
        tipo: String,
        nome: String
    },
    valorEmpenho: {
        type: Number,
    },
    descricao: {
        type: String
    },
    valorLiquido: {
        type: Number,
    },
    valorPago: {
        type: Number
    },
    tipo: {
        type: String,
        default: "ordinarios"
    },
    ultimoMesPago: {
        type: String
    },
    dataEmpenho: {
        type: String
    },
    status: {
        type: String,
    },
    obs: {
        type: String,
    }
})
module.exports = ProcessoSchema