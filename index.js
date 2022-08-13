const express = require("express")
require("dotenv").config()
const path = require("path");
const cors = require("cors")
const app = express()
const credorRouter = require("./routes/credorRoutes")
const processosRouter = require("./routes/processoRoutes")
const statusRouter = require("./routes/statusRoutes")
const controladorRouter = require("./routes/controladorRoutes")
const PORT = process.env.PORT
const HOST = process.env.HOST
app.use(express.json())
app.use(cors({origin: `http://${HOST}:${3000}`}))
console.log(`ORIGEM: http://${HOST}:${PORT}`)
app.use(credorRouter)
app.use(processosRouter)
app.use(statusRouter)
app.use(controladorRouter)



const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/gerenciador").then(() => {
    console.log("Conectado no banco de dados");
}).catch((err) => {
    console.log("Erro ao conectar no banco de dados");
    console.log(err);
})

app.use(express.static("build"))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/build", "index.html"))
})


const logger = (req, res, next) => {
    constole.log(req)
    return next()
}

app.use(logger)

app.listen(PORT, "0.0.0.0", () => {
    console.info(`Servidor Rodando na porta ${PORT}`)
})
