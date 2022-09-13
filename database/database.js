const Sequelize = require("sequelize");

const connection = new Sequelize('guiaperguntas', 'root', 'maus07',{
    host:"localhost",
    dialect:"mysql"
});

module.exports = connection;