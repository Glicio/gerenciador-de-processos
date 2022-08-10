const mongoose = require("mongoose")
const ControladorSchema = require("../schemas/ControladorSchema")
const Controlador = mongoose.model("controlador", ControladorSchema)


const createControlador = async (nome, cpf, cargo) => {
    const controladorToCreate = new Controlador({nome,cpf,cargo})
    return controladorToCreate.save()
}

const deleteControlador = async (id) => {
    const toDelete = await Controlador.deleteOne({_id: id})
    return toDelete
}

const getControladores = async () => {
    const list = await Controlador.find()
    return list
}

const updateControlador = async (id, nome, cpf, cargo) => {
    const update = await Controlador.updateOne({_id: id}, {nome,cpf,cargo})
    return update
}


module.exports = {createControlador, deleteControlador, getControladores, updateControlador}