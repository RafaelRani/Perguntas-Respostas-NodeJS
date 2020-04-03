const Sequelize = require("sequelize")
const connection = require("../database/database")
const Question = require("../questions/Question")

const Answer = connection.define("answers", {
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    date:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Question.hasMany(Answer) //relacionamento 1 p muitos: Category tem vários Articles
Answer.belongsTo(Question) //relacionamento 1 p 1: Resposta pertence a Pergunta

//conectar o model ao bd
Answer.sync({force: false}).then(() => {
        console.log("table answers created!")
    })

module.exports = Answer