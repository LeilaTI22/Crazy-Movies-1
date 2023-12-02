var rutaP = require("express").Router();
var subirArchivo = require ("../middlewares/middlewares").subirArchivo;
var {usuario, admin}= require("../middlewares/passwords");
var fs = require("fs");
var path= require("path");
var {mostrarPeliculas, nuevaPelicula, buscarPorIdP, modificarPelicula,borrarPelicula} = require("../bd/peliculasBD");
var {nuevoPedido, mostrarPedidos} = require("../bd/pedidosBD")
const { mostrarUsuarios } = require("../bd/usuariosBD");

rutaP.get("/mostrarPeliculas", async (req, res) => {
    var pelis = await mostrarPeliculas();
    res.render("peliculas/mostrarP", {pelis});
})
rutaP.get("/nuevaPelicula", admin, (req,res)=>{
    res.render("peliculas/nuevoP");
}); 

rutaP.get("/pedirPelicula/:id",async(req,res)=>{
    var peli= await buscarPorIdP(req.params.id);
    res.render("peliculas/pedirP",{peli});
});

rutaP.post("/pedirPelicula", async(req, res) => {
    var error= await nuevoPedido(req.body);
    res.redirect("/mostrarPedidos");
})

rutaP.get("/mostrarPedidos",async(req,res)=>{
    var pedids = await mostrarPedidos();
    var pelis = await mostrarPeliculas();
    res.render("pedidos/mostrarPedidos",{pedids, pelis});
});

rutaP.post("/nuevaPelicula",subirArchivo(),async (req,res)=>{
    req.body.foto= req.file.originalname;
    var error= await nuevaPelicula(req.body);
    console.log(error);
    res.redirect("/mostrarPeliculas"); 
}); 

rutaP.get("/editarPelicula/:id",async(req,res)=>{
    var peli= await buscarPorIdP(req.params.id);
    res.render("peliculas/modificarP",{peli});
});

rutaP.post("/editarPelicula", subirArchivo(), async(req,res)=>{
    try {
            var rutaImagen = path.join(__dirname, "..", "web", "images", req.body.foto);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
                req.body.foto= req.file.originalname;
                await modificarPelicula(req.body);
            }
        
        res.redirect("/mostrarPeliculas");
    } catch (error) {
        console.error("Error al editar la pelicula :(", error);
    }
});

rutaP.get("/borrarPelicula/:id", async (req,res)=>{
    try {
        var prod = await buscarPorIdP(req.params.id);
        if (prod) {
            var rutaImagen = path.join(__dirname, "..", "web", "images", prod.foto);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
            }
            await borrarPelicula(req.params.id);
        }
        res.redirect("/mostrarPeliculas");
    } catch (error) {
        console.error("Error al borrar la pelicula :( ", error);
    }
    
});

module.exports = rutaP;