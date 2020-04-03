const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const routes = require('./routes')

//importando arquivo questionsController.js
//const questionsController = require("./questions/questionsController")
//importando arquivo awswersController.js
//const awswersController = require("./answers/answersController")

//database
connection
    .authenticate()
    .then(() => {
        console.log("connected with database!")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

    
app.set('view engine','ejs')
app.use(express.static('public'))
//bodyparser
app.use(bodyParser.urlencoded({extended: false})) //captura os dados do formulário e traduz em javascript
app.use(bodyParser.json()) //permite que se leia dados de formulários enviados via json
app.use(routes)

//app.use("/",questionsController)
//app.use("/",awswersController)


app.listen(3000,()=>{console.log("app runnig in port: 3000!")})