//
//
//
//
//
//  Abra o prompt de comando como adminstrador
//
//  Com o rect native crie um projeto e instale as dependencias. Entre na pasta do seu projeto.
//
//  salve este arquivo com o nome de crud.js na pasto do se projeto
//
//  execute este arquivo através do servido do node.js que fica acessivel na porta 3000 
//
//  node crude.js
//
//
// abra uma aba no navegador e acesse as URLs abaixo, observando o resultado após cada uma:
//
//  http://localhost:3000/crachas-select
//
//
//  http://localhost:3000/crachas-insert
//
//  http://localhost:3000/crachas-select
//
//
//  http://localhost:3000/crachas-update
//
//  http://localhost:3000/crachas-select
//
//
//  http://localhost:3000/crachas-delete
//
//  http://localhost:3000/crachas-select
//
//


const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');


const connection = mysql.createPool({
  host     : '52.67.231.97',
  user     : 'sql10445313',
  password : 'e3NeVICry1',
  database : 'sql10445313'
});


const app = express();


app.get('/crachas-select', function (req, res) {
    try{
      connection.getConnection(function (err, connection) { 
        console.log('...select');
        connection.query('SELECT * FROM Cracha', function (error, results, fields) {
          if(!!error) console.log('sql error'+error);
          else{
            res.send(results)
          }
        });
      });
    }catch(err){
      console.log('ERRO na conexão'+err);
    }
  });

  

app.get('/crachas-insert', function (req, res) {
  try{
    connection.getConnection(function (err, connection) {
      try{  
            console.log('...insert');
            const myJSON = '["(\'cracha_444\')", "(\'cracha_777\')", "(\'cracha_333\')"]';
            const crachas = JSON.parse(myJSON);
            console.log( JSON.stringify(crachas) );
            crachas_str = crachas.toString() ;
            console.log( crachas_str );
            sqlQuery = "INSERT INTO Cracha ( QRCode_txt) VALUES "+ crachas_str ;
            //  connection.query("INSERT INTO Cracha ( QRCode_txt) VALUES (?)", "('cracha_444')", function (error, results, fields) {
            //  connection.query("INSERT INTO Cracha ( QRCode_txt) VALUES "+"('cracha_444'),('cracha_333')", function (error, results, fields) {
            connection.query(sqlQuery, function (error, results, fields) {
                {
                  if(!!error) { console.log('sql error'+error);
                  }else{
                       res.send(results);
                  }
                }
            });
     
      }catch(error){
        console.log('sql error'+error);
      }
    });   
  }catch(err){
    console.log('ERRO na conexão'+err);
  }
});



app.get('/crachas-update', function (req, res) {
  try{
    connection.getConnection(function (err, connection) {
        console.log('...update');   
        //connection.query("UPDATE Cracha SET QRCode_txt = 'cracha_55555' WHERE Uid = 1", function (error, results, fields) {
        connection.query("UPDATE Cracha SET QRCode_txt = 'cracha_55555' WHERE QRCode_txt = 'cracha_333'", function (error, results, fields) {
          if(!!error) console.log('sql error'+error);
          else{
              res.send(results)}
        });
      });
  }catch(err){
    console.log('ERRO na conexão'+err);
  }
});


app.get('/crachas-delete', function (req, res) {
  try{
      connection.getConnection(function (err, connection) {
        console.log('...delete');
        //connection.query("DELETE FROM Cracha WHERE (QRCode_txt = 'cracha_444' OR QRCode_txt = 'cracha_555')", function (error, results, fields) {
        connection.query("DELETE FROM Cracha WHERE (QRCode_txt <> 'cracha_123')", function (error, results, fields) {
          if(!!error) console.log('sql error'+error);
          else{
          res.send(results)}
        });
      });
  }catch(err){
    console.log('ERRO na conexão'+err);
  }
});


// Iniciando o servidor.
app.listen(3000, () => {
 console.log('Vai no navegador e entra em http://localhost:3000/crachas-select pra ver os crachás cadastrados.');
 console.log('Vai no navegador e entra em http://localhost:3000/crachas-insert pra inserir um crachá.');
 console.log('Vai no navegador e entra em http://localhost:3000/crachas-update pra atualizar um crachá.');
 console.log('Vai no navegador e entra em http://localhost:3000/crachas-delete pra remover um crachá.');
});
