const express = require("express")
require("dotenv").config()
const path = require("path");
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors({origin: "http://localhost:3000"}))
const credorRouter = require("./routes/credorRoutes")
const processosRouter = require("./routes/processoRoutes")
const statusRouter = require("./routes/statusRoutes")
app.use(credorRouter)
app.use(processosRouter)
app.use(statusRouter)


const PORT = process.env.PORT
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



app.listen(PORT, () => {
    console.info(`Servidor Rodando na porta ${PORT}`)
})
