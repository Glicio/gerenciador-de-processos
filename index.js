const express = require("express")
require("dotenv").config()
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors({origin: "http://localhost:3000"}))
const credorRouter = require("./routes/credorRoutes")
const processosRouter = require("./routes/processoRoutes")
const statusRouter = require("./routes/statusRoutes")
const controladorRouter = require("./routes/controladorRoutes")
app.use(credorRouter)
app.use(processosRouter)
app.use(statusRouter)
app.use(controladorRouter)

const PORT = process.env.PORT
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/gerenciador").then(() => {
    console.log("Conectado no banco de dados");
}).catch((err) => {
    console.log("Erro ao conectar no banco de dados");
    console.log(err);
})



app.listen(PORT, () => {
    console.info(`Servidor Rodando na porta ${PORT}`)
})
