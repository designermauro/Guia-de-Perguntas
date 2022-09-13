const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // link bodyParse no express
const connection = require("./database/database"); //conecção LGBD mysql
const Pergunta = require("./database/Pergunta"); //importando o tabela pergunta
const Resposta = require("./database/Resposta"); //importando o tabela resosta
//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com SUCESSO com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

// Estou dizendo para o Express usar o EJS como View engine
app.set("view engine","ejs");
// Para adicionar imagens tenho que informar aqui no index.js para o express
app.use(express.static('public'));
// Body parse
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// rotas
app.get("/",(req, res)=>{
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']  // ASC = Crescente || DESC = Decrescente << se usar campo String vai ser ordem Alfabetica
    ]}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        });
    });  
});

app.get("/perguntar",(req, res)=>{
    res.render("perguntar");
});

app.post("/salvarpergunta",(req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //res.send("Formulário recibido! titulo "+ titulo +" "+ "descricao "+ descricao);    
        Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=> {
        res.redirect("/");
    });

});
 
app.get("/pergunta/:id",(req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where:{id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ 
            Resposta.findAll({
                where:{perguntaId: pergunta.id},
                order:[
                    ["id","DESC"]
                ]
            }).then(respostas =>{
              res.render("pergunta", {
            pergunta: pergunta,
            respostas: respostas
           });
         });

        }else{ 
           res.redirect("/");
        }
    });

});
app.post("/responder", (req, res)=>{
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId); 
    });
});



app.listen(8080,()=>{console.log("App rondando! a 100%");});