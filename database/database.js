const Sequelize = require('sequelize')
const connection = new Sequelize('guiapergunta', 'root', 'rafarani008',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection