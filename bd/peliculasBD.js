var conexion=require ("./conexion").conexionPeliculas;
var Pelicula=require ("../modelos/Pelicula");
var Pedidos=require ("../modelos/Pedidos");


async function mostrarPeliculas(){
    var pelis = [];
    try {
        var peliculas = await conexion.get();
        peliculas.forEach(pelicula => {
        var pelicula1 = new Pelicula(pelicula.id, pelicula.data());
        if(pelicula1.bandera == 0){
            pelis.push(pelicula1.obtenerPelicula);
        }
    })
    }
    catch(err) {
        console.log("Error al mostrar películas " + err);
        pelis = [];
    }
    return pelis;
}

async function pedirPelicula(datos){
  var error = 1;
  try {
    var pedido1 = new Pedidos(null, newPedi);
  } catch (error) {
    
  }
}

async function nuevaPelicula(newPeli){ 
  var error=1; 
  try{
    var pelicula1 = new Pelicula(null,newPeli); 
    if(pelicula1.bandera==0){
      console.log(pelicula1.obtenerPelicula);
      await conexion.doc().set(pelicula1.obtenerPelicula); //doc sin id 
      error=0;
    }
    else{
      console.log("Datos incorrectos del formulario");
    }
  }
  catch(err){
    console.log("Error al crear una nueva película "+err);
  }
  return error; 
}

async function buscarPorIdP(id) {
  var peli;
  try {
    var peliculaBD = await conexion.doc(id).get();
    var peliculaObjeto= new Pelicula(peliculaBD.id, peliculaBD.data());
    if(peliculaObjeto.bandera==0){
      peli = peliculaObjeto.obtenerPelicula;
    }
  } catch (err) {
    console.log("Error al buscar PELÍCULA por ID: " + err);
  }
  return peli; 
}

async function modificarPelicula(datos){
  var peli= new Pelicula(datos.id,datos);
  var error=1;
  if(peli.bandera==0){
    try{
      await conexion.doc(peli.id).set(peli.obtenerPelicula);
      console.log("Los datos de la película ya se modificaron correctamente");
      error=0; 
    }catch(err){
     console.log("Error al modificar la película" + err);
    }
  }else{
    console.log("Error, los datos no son válidos");
  }
  return error; 
}

async function borrarPelicula(id){
  var error=1;
  var peli= await buscarPorIdP(id);
  if(peli != undefined){
    try{
      await conexion.doc(id).delete() ;
      console.log("Película eliminada exitosamente");
      error=0;
    }catch(err){
      console.log("Error al borrar la película "+err);
    }
 }
 return error; 
}


module.exports = {
   mostrarPeliculas,
   nuevaPelicula,
   buscarPorIdP,
   modificarPelicula,
   borrarPelicula
}
