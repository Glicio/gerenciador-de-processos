const mongoose = require("mongoose")
const StatusSchema = new mongoose.Schema({
    descricao: String
})
module.exports = StatusSchema;