const express = require('express')

const questionsController = require('./questions/questionsController')
const answersController = require("./answers/answersController")

const routes = express.Router()

// Exibir página inicial com as perguntas listadas
routes.get('/', questionsController.index)
// Exibir página para adicionar perguntas
routes.get('/questions/new', questionsController.new)
// C - Adicionar perguntas
routes.post('/questions/save', questionsController.create)
// R - Exibir página com a pegunta selecionada e suas respostas
routes.get('/question/:id', questionsController.display)
// Exibir tela de edição de pergunta
routes.get('/questions/edit/:id', questionsController.formUpdate)
// U - Editar pergunta
routes.post('/questions/update', questionsController.update)
// D - Deletar pergunta
routes.post('/questions/delete', questionsController.delete)
//paginação de perguntas
routes.get('/questions/page/:num', questionsController.page)

// C - Adicionar resposta
routes.post('/answers/new', answersController.create)
// Exibir tela de edição de resposta
routes.get('/answers/edit/:idQuestion/:idAnswer', answersController.formUpdate)
// U - Editar resposta
routes.post('/answers/update', answersController.update)
// D - Deletar resposta
routes.post('/answers/delete', answersController.delete)
//paginação de respostas
routes.get('/answers/page/:id/:num', answersController.page)


module.exports = routes