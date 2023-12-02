const { log } = require("console");
var crypto = require("crypto");

function generarPassword(password){
    var salt= crypto.randomBytes(32).toString("hex");
    var hash = crypto.scryptSync(password, salt, 100000,64,"sha512").toString("hex");
    return {
        salt,
        hash
    }

}

function validarPassword(password,salt,hash){
    var hashNuevo = crypto.scryptSync(password, salt, 100000,64,"sha512").toString("hex");
    return hashNuevo === hash;

}

function usuario(req,res,siguiente){
    console.log(req.session.usuario);
    if(req.session.usuario || req.session.admin){
        siguiente();
    }else{
        res.redirect("/login");
    }

}

function admin(req,res,siguiente){
    if(req.session.admin){
        siguiente();
    }else{
        res.redirect("/login");
    }
}

module.exports= {
    generarPassword,
    validarPassword,
    usuario,
    admin
}