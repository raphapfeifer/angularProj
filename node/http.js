var router = require('./router');

var app = router(3412);

var operadoras = [
    {nome:"Oi",codigo: 14,categoria:"Celular",preco: 2},
    {nome:"Vivo",codigo: 15,categoria:"Celular",preco: 1},
    {nome:"Tim",codigo:41,categoria:"Celular",preco:3},
    {nome:"GVT",codigo:25,categoria:"Fixo",preco:1},
	{nome:"Embratel",codigo:21,categoria:"Fixo",preco:2}
];

var contatos = [
    {nome:"bruno da silva", teleforne: "9999-2222", data: new Date(), operadora: operadoras[0]},
    {nome:"sandra pires", telefone: "9999-3333",data: new Date(),operadora: operadoras[1]},
    {nome:"mariana alves",telefone:"9999-9999", data: new Date(),operadora: operadoras[2]}
];


app.interceptor(function (req,res,next){
	console.log('interceptor 1');
    res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','origin, x-requested-with,Content-Type');
    next();
});


/*app.interceptor(function (req,res,next){
    res.setHeader('Content-Type','application/json;charset=UTF-8');
    next();
});*/

app.get('/operadoras',function (req,res) {
    res.write(JSON.stringify(operadoras));
    res.end();
});

app.get('/contatos',function (req,res){
    res.write(JSON.stringify(contatos));
    res.end();
});

app.post('/contatos',function (req,res) {
    var contato = req.body;
    contatos.push(JSON.parse(contato));
    res.end();
});

app.delete('/contatos',function(req,res){


    //console.log(req.body);
    var contato = req.body;

   /* contato.forEach(function(elemento){
       console.log(elemento);
   });*/

   console.log(contato);
    

   // contatos.splice(JSON.parse(pos),1);
    
    res.end();
});

app.options('/contatos',function (req,res){
    res.end();
});
