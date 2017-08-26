var express=require('express');
var bodyParser=require('body-parser');
var app=express();
const PORT=process.env.PORT||8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api',require('./routes/login'))
app.use('/xyz',function(req,res){
    var car={
        model:'Maruti',
        price:1000,
        t:function(){
            console.log('hello')
        }
    }
    res.send(car);
});

app.use('/product/:id',function(req,res){
    var val=req.params.id;
    res.send(val.toString());
});


//user?id=dfj
app.use('/user',function(req,res){
    var val=req.query.id;
    res.send(val.toString());
});


app.post('/myapi',function(req,res){
    var d={
        date:new Date()
    }
    res.send(d);
});
app.get('/api1',function(req,res,next){
    console.log('fun1');
   // res.send('hello');
    next();
})
app.get('/api1',function(req,res){
    console.log('fun2');
    res.send('success');
})

// app.get('/api2',function(req,res,next){

// },function(req,res){

// })

app.use(express.static('./public'));
app.listen(PORT,function(err){
    if(err){
        console.log('Error while running server');
    }else{
        console.log('Running on '+PORT)
    }
})