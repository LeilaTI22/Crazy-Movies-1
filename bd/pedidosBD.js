var conexion = require("./conexion").conexionPedidos;
var Pedidos = require ("../modelos/Pedidos");

async function mostrarPedidos(){
    var pedids = [];
    try {
        var pedidos = await conexion.get();
        pedidos.forEach(pedido => {
        var pedido1 = new Pedidos(pedido.id, pedido.data());
        if(pedido1.bandera == 0){
            pedids.push(pedido1.obtenerPedido);
        }
    })
    }
    catch(err) {
        console.log("Error al mostrar pedidos " + err);
        pedids = [];
    }
    return pedids;
}

async function nuevoPedido(newPedi){ 
    var error=1;
    try{
      var pedido1 = new Pedidos(null,newPedi); 
      if(pedido1.bandera==0){
        await conexion.doc().set(pedido1.obtenerPedido); //doc sin id 
        error=0;
      }
      else{
        console.log("Datos incorrectos del formulario");
      }
    }
    catch(err){
      console.log("Error al crear una nuevo pedido "+err);
    }
    return error; 
  }

  module.exports = {
    mostrarPedidos,
    nuevoPedido
 }