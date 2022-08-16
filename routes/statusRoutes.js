const express = require("express")
const { createStatus, getStatus, deleteStatus } = require("../database/models/status")
const router = express.Router()

router.post("/status/create/", (req, res) => {
    createStatus(req.body.descricao).then(result => {
        console.log(result);
        return res.status(201).send(result)
    }).catch(err => {
        return res.status(400).send(err)
    })
})
router.post("/status/get/", (req, res) => {
    getStatus(req.body.descricao).then(result => {
        return res.status(200).send(result)
    }).catch(err => {
        return res.status(400).send(err)
    })
})

router.post('/status/delete/', (req, res) => {
  const id  = req.body.id
    deleteStatus(id).catch(err => {
        return res.status(300).send(err)
    })
    return res.send({status: "success", data: "deleted"})

});


module.exports = router