const Sequelize = require("sequelize")
const connection = require("../database/database")

const Question = connection.define('questions',{
    author:{
        type: Sequelize.STRING,
        allowNull: false
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    date:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Question.sync({force: false}).then(() => {
    console.log("table questions created!")
})

module.exports = Question