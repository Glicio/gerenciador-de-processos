const express = require("express");
const { createProcesso, getProcessos, deletProcesso } = require("../database/models/Processo");
const router = express.Router();

router.post("/processo/create", (req, res) => {
  const processoToCreate = req.body.processoToCreate;

  createProcesso(
    processoToCreate
  )
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status(401).send(err);
    });
});
router.post("/processo/get", (req,res) => {
  getProcessos(req.body.query).then(result => {
    return res.send(result)
  }).catch(err => {
    console.log(err);
    return res.status(300).send(err)
  })
})

router.post("/processo/delete", (req,res) => {
  deletProcesso(req.body.id).then(result => {
    return res.send(result)
  }).catch(err => {
    return res.status(300).send(err)
  })
})

router.post("/processo/update", (req,res) => {
  updateProcesso(req.body.processo).then((result) => {
    return res.send(result)
  }).catch((err) => {
    return res.status(300).send(err)
  });
})

module.exports = router;
