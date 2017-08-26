var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var jwt = require('jsonwebtoken');
app.post('/login', function (req, res) {
    if (req.body.username == 'admin' && req.body.password == 'admin') {
        var token = jwt.sign({ username: req.body.username }, 'abcd');
        res.send({
            token: token
        });
    } else {
        res.status(401).send({
            error: 'Invalid login'
        })
    }
});
var checkToken=function(req,res,next){
    var token=req.headers.token;
    jwt.verify(token,'abcd',function(err,decoded){
        if(err){
            res.status(403).send('error');
        }else{
            req.decoded=decoded;
            
            next();
        }
    })
    
}
app.get('/products', checkToken,function(req,res){
    var products=[{p:1},{p:2},{p:3}];
    var resObj={
        decoded:req.decoded,
        products:products
    }
    res.send(resObj)
})

app.listen(9000, function (err) {
    console.log(err || 'Running');
})