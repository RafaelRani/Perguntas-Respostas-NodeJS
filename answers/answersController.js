const express = require("express")
const Question = require("../questions/Question")
const Answer = require("./Answer")
const moment = require("moment")

module.exports = {
    create(req,res){
        var author = req.body.author
        var body = req.body.body
        var questionId = req.body.question
        var CurrentDate = moment().format('DD/MM/YYYY - LT')
        Answer.create({
            author: author,
            body: body,
            date: CurrentDate,
            questionId: questionId
        }).then(() => {
            res.redirect("/question/" + questionId)
        })
    },

    formUpdate(req, res){
        var idQuestion = req.params.idQuestion
        var idAnswer = req.params.idAnswer
        if(!isNaN(idQuestion) || !isNaN(idAnswer)){
            Question.findByPk(idQuestion).then(question =>{ //findByPk: método para pesquisar por id de forma mais rápida
                if(question != undefined){
                    Answer.findAll({ where: {questionId: idQuestion}, order: [['id','DESC']] }).then(answers => {
                        if(answers != undefined){
                            Answer.findByPk(idAnswer).then(answer =>{ //findByPk: método para pesquisar por id de forma mais rápida
                                if(answer != undefined){
                                    res.render("answers/edit", {question: question, answers: answers, answer: answer})
                                }
                            }).catch(erro => {
                                res.redirect("/question/" + idQuestion)
                            })
                        }
                    }).catch(erro => {
                        res.redirect("/question/" + idQuestion)
                    })
                }
            }).catch(erro => {
                res.redirect("/question/" + idQuestion)
            })
        }else{
            res.redirect("/question/" + idQuestion)
        }
    },
    
    update(req, res){
        var id = req.body.id
        var author = req.body.author
        var body = req.body.body
        var questionId = req.body.question
        var CurrentDate = moment().format('DD/MM/YYYY - LT')

        Answer.update({
            author: author,
            body: body,
            questionId: questionId,
            date: CurrentDate
        },
        {
            where: {
                id: id //na categoria onde o id = id enviado
            }
        }).then(() => {
            res.redirect("/question/" + questionId)
        })
    },

    delete(req, res){
        var answerId = req.body.answerId
        var questionId = req.body.questionId
        if(answerId != undefined){ //se o id não é nulo
            if(!isNaN(answerId)){ //se o id for um número / NaN = Not a Number
                Answer.destroy({ //destruir / deletar
                    where: {
                        id: answerId //onde o id é igual ao var id passado
                    }
                }).then(() => {
                    res.redirect("/question/" + questionId)
                })
            }else{
                res.redirect("/question/" + questionId)
            }
        }else{
            res.redirect("/question/" + questionId)
        }
    },

    page(req, res){
        var idQuestion = req.params.id
        var page = req.params.num
        var offset = 0 //ordem a partir da qual será exibida a resposta
        var limit = 8 //número de respostas exibidas por página
        if(isNaN(page) || page == 1){
            offset = 0
        }else{
            offset = (parseInt(page) - 1) * limit
        }

        Question.findByPk(idQuestion).then(question =>{ //findByPk: método para pesquisar por id de forma mais rápida
            if(question != undefined){
                Answer.findAndCountAll({ 
                    where: {questionId: idQuestion},
                    limit: limit, //mostra apenas os 4 primeiros registros
                    offset: offset, //mostra a partir do número do registro contido na var offset
                    order:[['id', 'DESC']]
                }).then(answers => {
                    var next
                    if(offset + limit >= answers.count){ //se o offset atual + qtd de respostas por página > numero de respostas: já não existe outra página a ser exibida
                        next = false //chegou na última página
                    }else{
                        next = true //não chegou na última página
                    }
                    var result = {
                        page: parseInt(page),
                        next: next,
                        answers: answers,
                        question: question
                    }
                    res.render("answers/page", {result: result})
                    //res.json(result) //renderiza em formato json
                }).catch(erro => {
                    res.redirect("/question/" + idQuestion)
                })
            }
        }).catch(erro => {
            res.redirect("/question/" + idQuestion)
        })
    }
}