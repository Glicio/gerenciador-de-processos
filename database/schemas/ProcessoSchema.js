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
    andamento: {
        memorando: { type: Boolean, default: false},
        dotacao: { type: Boolean, default: false},
        contrato: { type: Boolean, default: false},
        protocolo: { type: Boolean, default: false},
        autorizacao: { type: Boolean, default: false},
        empenho: { type: Boolean, default: false},
        ordemDeFornecimento: { type: Boolean, default: false},
        notaFiscal: { type: Boolean, default: false},
        atesto: { type: Boolean, default: false},
        autuacao: { type: Boolean, default: false},
        dataAnalise: Date,
        extras: [],
        controlador: {
            id: {type: String, default: ""},
            nome: {type: String, default: ""},
        },
        certidoes: {
            estadual: String,
            fgts: String,
            trabalhista: String,
            receitaFederal: String,
            municipal: String
        }
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