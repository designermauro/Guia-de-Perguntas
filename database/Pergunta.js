const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('perguntas', {
        titulo:{
        type: Sequelize.STRING, 
        allowNull:false //e o comando notnull
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull:false
    }
});

Pergunta.sync({force: false}).then(() =>{});  //caso o banco não tenha a tebela pergunta ele vai criar <<force:false>> e para não forçar a criar tabela

module.exports = Pergunta;
