const { createCredor, getCredores, getAllCredores, updateCredor, deleteCredor } = require("../database/models/Credor")

const express = require("express")
const router = express.Router()



router.post("/credor/create", async (req,res) => {
    const credor = await createCredor(req.body.credorToCreate)
    console.log(credor);
    if(credor){
        return res.send(credor)
    }
    return res.status(300).send({status: "error", message: "Credor já cadastrado!"})
})
router.post("/credor/get", (req,res) => {
    getCredores(req.body.search).then(result => {
        return res.status(200).send(result)
    }).catch(err => {
        return res.status(400).send(err)
    })
})

router.post("/credor/update", (req,res) => {
    const credorToUpdate = req.body.credor
    updateCredor(credorToUpdate).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(300).send(err)
    });
})

router.get("/credor/get/all", (req,res) => {
    getAllCredores().then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(300).send(err)
    });
})

router.post("/credor/delete",(req,res) => {
    const id = req.body.id
    deleteCredor(id).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(300).send(err)
    });
})


module.exports = router