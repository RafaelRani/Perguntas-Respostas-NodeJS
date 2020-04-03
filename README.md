# Perguntas-Respostas-NodeJS
Plataforma de Perguntas e Respostas desenvolvida com NodeJs (Framework: ExpressJS)

- Permite adicionar, ler, editar e apagar perguntas ao bd e as exibe da mais noova à mais antiga (ordem decrescente), mostrando: título, descrição, autor e data-hora
- Permite adicionar, ler, editar e apagar respostas para cada pergunta e as exibe da mais noova à mais antiga (ordem decrescente), mostrando: descrição, autor e data-hora
- Faz paginação das perguntas e das resposta mostrando 8 perguntas/resposta por cada página

# Pre-Requisitos:
- Ter o NodeJS instalado
- Ter o MySQL instalado

# Como rodar a aplicação:
1. Abra o MySQL e crie um novo bd com o nome 'guiapergunta' (pode ser mudado):<br>
  create database guiapergunta;
  
2. Abra o bd criado e execute os seguintes comandos:<br>
  use guiapergunta; <br>
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '[senha-do-usuario]'
  
3. Configure a conexão da aplicação ao bd, inserindo sua de usuário mysql, no arquivo 'database/database.js'<br>
  const connection = new Sequelize('guiaperguntas', 'root', '[senha-do-usuário]',{<br>
      host: 'localhost',<br>
      dialect: 'mysql'<br>
  })

4. Instale as dependências, abrindo a pasta do projeto no CMD e utilizando o comando:<br>
  $ npm install
  
5. Rode a aplicação com o comando:<br>
  $ nodemon app.js
  
