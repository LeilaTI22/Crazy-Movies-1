var rutaP = require("express").Router();
var subirArchivo = require ("../middlewares/middlewares").subirArchivo;
var fs = require("fs");
var path= require("path");
var {mostrarProductos, nuevoProducto, buscarPorIdP, modificarProducto,borrarProducto} = require("../bd/productosBD");

rutaP.get("/mostrarProductos", async (req, res) => {
    var prods = await mostrarProductos();
    //console.log(users);
    res.render("productos/mostrarP", {prods});
})
rutaP.get("/nuevoProducto",(req,res)=>{
    res.render("productos/nuevoP");
}); 

rutaP.post("/nuevoProducto",subirArchivo(),async (req,res)=>{
    req.body.foto= req.file.originalname;
    //console.log(req.body);
    var error= await nuevoProducto(req.body);
    console.log(error);
    res.redirect("/mostrarProductos"); 
}); 

rutaP.get("/editarProducto/:id",async(req,res)=>{
    var prod= await buscarPorIdP(req.params.id);
    res.render("productos/modificarP",{prod});
});

rutaP.post("/editarProducto",subirArchivo(),async (req,res)=>{
    try {
            var rutaImagen = path.join(__dirname, "..", "web", "images", req.body.foto);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
                req.body.foto= req.file.originalname;
                await modificarProducto(req.body);
            }
        
        res.redirect("/mostrarProductos");
    } catch (error) {
        console.error("Error al editar producto :(", error);
    }
});

rutaP.get("/borrarProducto/:id", async (req,res)=>{
    try {
        var prod = await buscarPorIdP(req.params.id);
        if (prod) {
            var rutaImagen = path.join(__dirname, "..", "web", "images", prod.foto);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
            }
            await borrarProducto(req.params.id);
        }
        res.redirect("/mostrarProductos");
    } catch (error) {
        console.error("Error al borrar producto :( ", error);
    }
    
});



module.exports = rutaP;