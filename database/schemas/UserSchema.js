const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    cpf: {
        type: String,
        unique: true
    },
    secretarias: {
        type: Array,
        default: []
    },
    passwordHash: {
        type: String
    }
})