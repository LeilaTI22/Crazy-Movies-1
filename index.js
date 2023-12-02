require("dotenv").config();
var express=require("express");
var path= require("path");
var cors = require("cors");
var session = require("cookie-session");
var usuariosRutas=require("./rutas/usuariosRutas"); 
var usuariosRutasApis=require("./rutas/usuariosRutasApis");
var peliculasRutas=require("./rutas/peliculasRutas"); 
var peliculasRutasApis=require("./rutas/peliculasRutasApis"); 
var app=express();

app.set("view engine","ejs"); 
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
app.use(session({
    name:"session",
    keys:["asjadjaksdjasjk"],
    maxAge: 24 * 60 * 60 * 1000 // expiration in ms
}));
app.use("/",express.static(path.join(__dirname,"/web")));
app.use("/",usuariosRutas);
app.use("/",usuariosRutasApis);
app.use("/",peliculasRutas);
app.use("/",peliculasRutasApis);

var port=process.env.PORT || 4000; 

app.listen(port, ()=>{
    console.log("server in http://localhost:"+port);
});
