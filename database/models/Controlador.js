const mongoose = require("mongoose")
const ControladorSchema = require("../schemas/ControladorSchema")
const Controlador = new mongoose.model("controlador", ControladorSchema)


const createControlador = async (nome, cargo) => {
    const controladorToCreate = new Controlador(nome,cargo)
    return controladorToCreate.save()
}


module.exports.createControlador = createControlador