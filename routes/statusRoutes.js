const express = require("express")
const { createStatus, getStatus } = require("../database/db")
const router = express.Router()

router.post("/status/create", (req, res) => {
    createStatus(req.body.descricao).then(result => {
        return res.status(201).send(result)
    }).catch(err => {
        return res.status(400).send(err)
    })
})
router.post("/status/get", (req, res) => {
    getStatus(req.body.descricao).then(result => {
        return res.status(200).send(result)
    }).catch(err => {
        return res.status(400).send(err)
    })
})


module.exports = router