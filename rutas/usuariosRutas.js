var ruta = require("express").Router();
var subirArchivo = require ("../middlewares/middlewares").subirArchivo;
var {usuario, admin}= require("../middlewares/passwords");
var fs = require("fs");
var path= require("path");
var {mostrarUsuarios, nuevousuario, buscarPorId ,modificarUsuario,borrarUsuario, login } = require("../bd/usuariosBD");
const { log } = require("console");
const { validarPassword } = require("../middlewares/passwords");

ruta.get("/login", async(req,res)=>{
    res.render("usuarios/login")
});


ruta.post("/login", async(req,res)=>{
  var user = await login(req.body);
  if(user == undefined){
      res.redirect("/login");
  }else{
    if(user.admin){
        req.session.admin=req.body.usuario;
        res.redirect("/nuevaPelicula");
    }else{
        req.session.usuario=req.body.usuario;
        console.log(req.session.usuario);
        res.redirect("/mostrarPeliculas")
    }
  }
});

ruta.get("/logout",(req,res)=>{
    req.session=null;
    res.redirect("/login")
});

ruta.get("/", usuario, async (req, res) => {
    var users = await mostrarUsuarios();
    res.render("usuarios/mostrar", {users});
})
ruta.get("/nuevousuario",(req,res)=>{
    res.render("usuarios/nuevo");
}); 

ruta.post("/nuevousuario", subirArchivo(), async (req,res)=>{
    req.body.foto= req.file.originalname;
    var error= await nuevousuario(req.body);
    res.redirect("/"); 
}); 

ruta.get("/editarUsuario/:id",async(req,res)=>{
    var user= await buscarPorId(req.params.id);
    res.render("usuarios/modificar",{user});
});

ruta.post("/editarUsuario", subirArchivo(),async (req,res)=>{
    if(req.file!=undefined){
        req.body.foto=req.file.originalname;
    }else{
        req.body.foto=req.fotoVieja;
    }
    var error=await modificarUsuario(req.body);
    res.redirect("/");

}); 


ruta.get("/borrarUsuario/:id", async (req, res) => {
    try {
        var usuario = await buscarPorId(req.params.id);
        if (usuario) {
            var rutaImagen = path.join(__dirname, "..", "web", "images", usuario.foto);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
            }
            await borrarUsuario(req.params.id);
        }
        res.redirect("/");
    } catch (error) {
        console.error("Error al borrar usuario:", error);
    }
});

module.exports = ruta;