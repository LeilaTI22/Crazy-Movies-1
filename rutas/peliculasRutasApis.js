var rutaP = require("express").Router();
var {mostrarPeliculas, nuevaPelicula, buscarPorIdP, modificarPelicula, borrarPelicula} = require("../bd/peliculasBD");
const Producto = require ("../modelos/Pelicula")

rutaP.get("/api/mostrarPeliculas", async (req, res) => {
    var pelis = await mostrarPeliculas();
    if(pelis.length > 0){
        res.status(200).json(pelis)
    }else{
        res.status(400).json("Peliculas no encontradas :(")
    }

});

rutaP.get("/nuevaPelicula",(req,res)=>{
    res.render("peliculas/nuevoP");
}); 

rutaP.post("/api/nuevaPelicula",async (req,res)=>{
    var error= await nuevaPelicula(req.body);
    if(error==0){
        res.status(200).json("Pelicula registrada")
    }else{
        res.status(400).json("No se registro la pelicula")
    }
}); 

rutaP.get("/api/buscarPeliculaPorId/:id",async(req,res)=>{
    var peli= await buscarPorIdP(req.params.id);
    if(peli!=undefined){
        res.status(200).json(peli)
    }else{
        res.status(400).json("Pelicula no encontrada")
    }
});

rutaP.post("/api/editarPelicula", async (req,res)=>{
    var error=  await modificarPelicula(req.body);
    if(error==0){
        res.status(200).json("Pelicula actualizada")
    }else{
        res.status(400).json("Error al actualizar la pelicula")
    }
});

rutaP.get("/api/borrarPelicula/:id", async (req,res)=>{
   var error= await borrarPelicula(req.params.id);
    if(error==0){
        res.status(200).json("Pelicula borrada correctamente")
    }else{
        res.status(400).json("Error al borrar la pelicula")
    }
});

module.exports = rutaP;