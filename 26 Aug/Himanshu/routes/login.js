var express=require('express');
var app=express.Router();
app.get('/login',function(req,res){
    res.send('Login Api Called')
})

module.exports= app;