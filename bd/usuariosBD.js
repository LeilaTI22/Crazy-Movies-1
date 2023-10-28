var conexion = require("./conexion").conexionUsuarios;
var Usuario = require("../modelos/Usuario");
var {generarPassword, validarPassword}= require("../middlewares/passwords")

async function mostrarUsuarios(){
    var users = [];
    try {
        var usuarios = await conexion.get();
        usuarios.forEach(usuario => {
        //console.log(usuario.data());
        var usuario1 = new Usuario(usuario.id, usuario.data());
        if(usuario1.bandera == 0){
            users.push(usuario1.obtenerUsuario);
        }
    })
    }
    catch(err) {
        console.log("Error al mostrar usuarios " + err);
        users = [];
    }
    return users;
}

async function login(datos){
  var user=undefined;
  var usuarioObjeto;
  try{
  var usuarios = await conexion.where('usuario','==',datos.usuario).get();
  if(usuarios.docs.length==0){
      console.log("usuario no existe");
      return undefined;
  }
  ///console.log("hola");
    usuarios.docs.filter((doc)=>{
      //console.log("holaaaa");
    var validar = validarPassword(datos.password,doc.data().salt,doc.data().password); 
    //console.log(user);
    ///console.log(validar);
    if(validar){
      //console.log("1");
      usuarioObjeto= new Usuario(doc.id, doc.data());
      if(usuarioObjeto.bandera===0){
       // console.log("2");
        user=usuarioObjeto.obtenerUsuario;
        return user;
      }
    }else{
      console.log("contraseña incorrecta");
      
      return undefined;
    }
  });
}catch(err){
  console.log("Error al iniciar sesion "+err);
}
  return user;
}


async function nuevousuario(newUser){ //LE CAMBIE LA MAYUSCULA 
  var {salt, hash}= generarPassword(newUser.password);
  newUser.salt=salt;
  newUser.password = hash;
  newUser.admin = "false";
  var error=1; 
  try{
    var usuario1 = new Usuario(null,newUser); 
    //console.log(usuario1);
    if(usuario1.bandera==0){
      console.log(usuario1.obtenerUsuario);
      await conexion.doc().set(usuario1.obtenerUsuario); //doc sin id 
      error=0;
    }
    else{
      console.log("Datos incorrectos del formulario");
    }
  }
  catch(err){
    console.log("Error al crear un nuevo usuario "+err);
  }
  return error; 
}

async function buscarPorId(id) {
  var user;
  try {
    //console.log(id);
    var usuarioBD = await conexion.doc(id).get();
    //var usuarioBD = await conexion.where("usuario","==",datos.usuario).get(); 
    var usuarioObjeto= new Usuario(usuarioBD.id, usuarioBD.data());
    //console.log(usuarioObjeto);
    if(usuarioObjeto.bandera==0){
      user = usuarioObjeto.obtenerUsuario;
      //console.log(user);
    }
    /*
    return usuarioObjeto; // Agregar retorno para la función*/
  } catch (err) {
    console.log("Error al buscar usuario por ID: " + err);
    //return null; // Manejar el error y devolver un valor adecuado
  }
  console.log(user);
  return user; 
}


async function modificarUsuario(datos){
  var error=1;
  var user=await buscarPorId(datos.id);
  if(user!=undefined){
    datos.admin=false;
    //console.log(datos);
    if(datos.password== ""){
      datos.password = datos.passwordAnterior;
    }else{
      var {salt,hash}= generarPassword(datos.password);
      datos.salt = salt;
      datos.password = hash;
    }
    var user= new Usuario(datos.id,datos);
    if(user.bandera==0){
      try{
        await conexion .doc(user.id).set(user.obtenerUsuario);
        console.log("Los datos ya se modificaron nice");
        error=0; 
      }catch(err){
      console.log("Error al modificar el usuario" + err);
      }
    }else{
      console.log("Error los datos no son validos");
    }
}
  return error; 
}

async function borrarUsuario(id){
  var error= 1; 
  var user= await buscarPorId(id);
  if(user!=undefined){
    try{
      await conexion.doc(id).delete() ;
      console.log("Registro borradoo :))");
      error=0;
    }catch(err){
      console.log("Error al borrar el usuario "+err);
    }
 }
 return error; 
}

module.exports = {
    mostrarUsuarios,
    nuevousuario,
    buscarPorId,
    modificarUsuario,
    borrarUsuario,
    login
}