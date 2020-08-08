const express = require("express")
const server = express()

const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require("./pages")

const nunjucks = require("nunjucks")

//Configura Nunjucks (template engine)
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Configurar servidor
server
//Receber dados da página
.use(express.urlencoded({extended: true}))
//Arquivos estáticos (styles, scripts, images)
.use(express.static("public"))
//Configura rotas
.get("/",pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
//Define porta
.listen(5500)