const express = require("express")
const Question = require("./Question")
const Answer = require("../answers/Answer")
const moment = require("moment")

module.exports = {
    index(req, res){
        var limit = 8 //número de perguntas exibidas por página
        Question.findAndCountAll({ //= select * ALL from questions;
            raw: true, // raw: true, para retornar os dados crus(raw)
            order:[
            ['id','DESC']], //ordenar por id / ASC: Crescente / DESC = decrescente
            limit: 8 //retonar 8 perguntas
        }).then(questions => {
            var next
            if(questions.count > limit){
                next = true //ainda não está na última página
            }else{
                next = false //já está na última página
            }
            var result = {
                next: next,
                questions: questions
            }
            res.render("index", {result: result})
        })
    },


    new(req, res){
        res.render("questions/new")
    },

    create(req, res){
        var author = req.body.author
        var title = req.body.title
        var description = req.body.description
        var currentDate = moment().format('DD/MM/YYYY - LT')//moment().format("DD/MM/YYYY - hh:mm a")
        //var horaAtual = moment().format("hhmmss")
        Question.create({ // = insert into question{ [dados] };
            author: author,
            title: title,
            description: description,
            date: currentDate
        }).then(() => {
            res.redirect("/")
        })
    },

    display(req,res){ 
        var id = req.params.id
        var limitAnswers = 8
        Question.findOne({ //busca um dado, através de uma condição
            where: {id: id}
            // que tenha o id igual a var 'id'
        }).then(question => {
            if(question != undefined){
                Answer.findAndCountAll({ 
                    where: {questionId: question.id}, //procurar por todas as respostas que tenham o id igual ao id da pergunta
                    order: [
                        ['id','DESC']], //ordenando por id em forma decrescente (DESC)
                    limit: 8
                }).then(answers => {
                    var next
                    if(answers.count > limitAnswers){
                        next = true //ainda não está na última página
                    }else{
                        next = false //já está na última página
                    }
                    res.render("questions/question", {
                        question: question,
                        answers: answers,
                        next
                    })
                })
            }else{
                res.redirect("/")
            }
        })
    },

    formUpdate(req, res){
        var id = req.params.id
        if(isNaN(id)){
            res.redirect("/question/" + id)
        }
        Question.findByPk(id).then(question =>{ //findByPk: método para pesquisar por id de forma mais rápida
            if(question != undefined){
                res.render("questions/edit", {question: question})
            }else{
                res.redirect("/question/" + id)
            }
        }).catch(erro => {
            res.redirect("/question/" + id)
        })
    },

    update(req, res){
        var id = req.body.id
        var author = req.body.author
        var title = req.body.title
        var description = req.body.description
        var currentDate = moment().format('DD/MM/YYYY - LT')

        Question.update({
            author: author,
            title: title,
            description: description,
            date: currentDate
        },
        {
            where: {
                id: id
            }
        }).then(() => {
            res.redirect("/question/" + id)
        })
    },

    delete(req, res){
        var id = req.body.id
        if(id != undefined){ //se o id não é nulo
            if(!isNaN(id)){ //se o id for um número / NaN = Not a Number
                Question.destroy({ //destruir / deletar
                    where: {
                        id: id //onde o id é igual ao var id passado
                    }
                }).then(() => {
                    res.redirect("/")
                })
            }else{
                res.redirect("/question/" + id)
            }
        }else{
            res.redirect("/question/" + id)
        }
    },

    page(req, res){
        var page = req.params.num
        var offset = 0 //ordem a partir da qual será exibida a pergunta
        var limit = 8 //número de perguntas exibidas por página
        if(isNaN(page) || page == 1){
            offset = 0
        }else{
            offset = (parseInt(page) - 1) * limit
        }
        Question.findAndCountAll({
            limit: limit, //mostra apenas os 8 primeiros registros
            offset: offset, //mostra a partir do número do registro contido na var offset
            order:[
                ['id', 'DESC']
            ]
        }).then(questions =>{ //retorna todos os registros da tabela e a quantida de registros
            var next
            if(offset + limit >= questions.count){ //se o offset atual + qtd de perguntas por página > numero de pergutas: já não existe outra página a ser exibida
                next = false //já está na última página
            }else{
                next = true //ainda não está na última página
            }
            var result = {
                page: parseInt(page),
                next: next,
                questions: questions
            }
            res.render("questions/page", {result: result})
        })
    }
}