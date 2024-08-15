const express = require('express');
global.config = require('./config.js').config;
global.app=express();
global.sha256 = require("sha256")

//para multer
global.path = require("path")
global.multer = require('multer')

global.productos = [];
global.categorias = [];

var bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))

global.raiz = __dirname

//esto surgio de una recomendacion a otro compañero, probar si es necesario
app.all('*',function(req, res, next){

    var whitelist = req.headers.origin;
    console.log(whitelist)
   res.header('Access-Control-Allow-Origin', whitelist);
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
   res.header('Access-Control-Allow-Headers', " authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
   res.header("Access-Control-Allow-Credentials", "true");
  // res.header('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure');


   next();

});

const mongoose = require("mongoose")



mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd, {}).then(
    ()=>console.log("connected")
).catch((error)=>{
    console.log(error)
});

var cors = require("cors")

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true) //peticiones horizontales

        if (config.origin.indexOf(origin) === -1) {
            return callback('error de cors', false)
        }

        return callback(null, true)
    }
}))

//1000x60 es un minuto 1000x60x60 es una hora
const MongoStore = require('connect-mongo');

var session = require("express-session")({
    secret:config.palabraClave,
    resave:true,
    saveUninitialized:true,
    cookie: {path:"/",httpOnly:true, maxAge: config.maxage},
    name: config.nombrecookie,
    rolling:true,
    store:MongoStore.create({mongoUrl:"mongodb://127.0.0.1:27017/"+config.bd+"cookies"})
})

app.use(session)

require('./routes.js')

app.use('/imagenes',express.static(__dirname + '/imagenes'))
app.use('/uploads',express.static(__dirname + '/uploads'))

app.use('/',express.static(__dirname + '/dist/api'))
app.get('/*', function(req,res,next){
    res.sendFile(path.resolve(__dirname + '/dist/api/index.html'))
})


app.listen(config.puerto, () => {
console.log('Servidor Express escuchando en el puerto '+config.puerto);
});



