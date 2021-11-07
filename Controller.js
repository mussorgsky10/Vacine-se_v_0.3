//nodemon Controller.js

const express=require('express');
const cors=require('cors');
const models=require('./models');

const app=express();
app.use(cors());
app.use(express.json()) //For JSON requests
app.use(express.urlencoded({extended: true}));
let user=models.User;
let use=models.Use;
let reward=models.Reward;
let sortition=models.Sortition;
let drawn=models.drawn;

app.post('/create',async (req,res)=>{
    let create = await user.create({
        name: req.body.name,
        phone: req.body.phone,
        createdAt: new Date(),
        updatedAt: new Date()
    });
});

app.post('/create-recompensa',async (req,res)=>{
    let create = await reward.create({
        item: req.body.item,
        descricao: req.body.descricao,
        createdAt: new Date(),
        updatedAt: new Date()
    });
});

app.post('/create-sorteado',async (req,res)=>{
    let create = await drawn.create({
        numero_sorteado: req.body.numero_sorteado,
        createdAt: new Date(),
        updatedAt: new Date()
    });
});

app.post('/create-uso',async (req,res)=>{
    let create = await use.create({
        userId: req.body.userId,
        nome: req.body.nome,
        badge: req.body.badge,
        createdAt: new Date(),
        updatedAt: new Date()
    });
});

app.post('/read', async (req,res)=>{
    try {
    const users = await user.findAll();
    if(response === null){
        res.send(JSON.stringify(`Nenhum usuário encontrado`));
    }else{
        res.send(JSON.stringify(response))
    }} catch (error) {
        console.error(error);
      }
});

app.post('/uso-cracha', async (req,res)=>{
    let response=await use.findOne({
        where:{userId:req.body.userId},
        include:[{all:true}]
    });
    if(response === null){
        res.send(JSON.stringify(`Sem crachá!`));
    }else{
        res.send(JSON.stringify(response.badge))
    }
});

app.get('/create',async (req,res)=>{
    let create=await user.create({
        name: "joao",
        phone: "456123",
        createdAt: new Date(),
        updatedAt: new Date()
    });
    res.send('Usuário criado com sucesso!');
});

app.get('/create-recompensa',async (req,res)=>{
    let create=await reward.create({
        item: "Batata",
        descricao: "Frita",
        createdAt: new Date(),
        updatedAt: new Date()
    });
    res.send('Recompensa criada com sucesso!');
});

app.get('/read', async (req,res)=>{ read-sorteados
    let read=await user.findAll({
        raw:true,
    });
    //console.log(read);
    res.send(read);
});

app.get('/read-sorteados', async (req,res)=>{
    let read=await drawn.findAll({
        raw:true,
    });
    //console.log(read);
    res.send(read);
});

app.get('/uso-cracha', async (req,res)=>{
    let response=await use.findByPk(1);
    if(response === null){
        res.send(JSON.stringify(`Sem crachá!`));
    }else{
        res.send(JSON.stringify(response))
    }
});

app.get('/read-recompensas', async (req,res)=>{
    let read=await reward.findAll({
        raw:true,
    });
    //console.log(read);
    res.send(read);
});

app.get('/create-sorteado',async (req,res)=>{
    let create = await drawn.create({
        numero_sorteado: "25",
        createdAt: new Date(),
        updatedAt: new Date()
    });
    res.send('Número armazenado com sucesso!');
});

let port=process.env.PORT || 3000   ;
app.listen(port,(req,res)=>{
    console.log('Servidor Rodando');
});