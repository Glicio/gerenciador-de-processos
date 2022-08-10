const {createControlador, getControladores, updateControlador } = require("../database/models/Controlador")

const express = require("express")
const router = express.Router()

router.post("/controlador/create/", (req,res) => {
    const {nome, cpf, cargo} = req.body.controlador
    createControlador(nome,cpf,cargo).then((result) => {
        return res.send(result)
    }).catch((err) => {
        console.log(err);
        return res.status(300).send(err)
    });
})

router.post("/controlador/update/", (req,res) => {
    const {id, nome, cpf, cargo} = req.body.controlador
    updateControlador(id,nome,cpf,cargo).then((result) => {
        return res.send(result)
    }).catch((err) => {
        return res.error(300).send(err)
    });
})

router.get("/controlador/get/", (req,res) => {
    getControladores().then((result) => {
        return res.send(result)
    }).catch((err) => {
        return res.status(300).send(err)
    });
})


module.exports = router