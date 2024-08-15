// cod_cat existente, 
// cod_producto: max 15, unico
// nombre: máxima es de 50 y mínima de 4

var productoModel = {}

const mongoose = require("mongoose");

const Schema = mongoose.Schema

var productosSchema = new Schema({
    cod_prod:String,
    nombre:String,
    estado:Number,
})

const myModel = mongoose.model('productos',productosSchema)



productoModel.buscarCodigo = function(post, callback) {
    let aux
    myModel.find({cod_prod:post.cod_prod},{nombre:1,cod_prod:1,estado:1,_id:0}).then(
        (respuesta) => {
        console.log("find: ",respuesta.length)

        if(respuesta.length == 0){
            return callback({state: true,posicion : -1});
        }else {
            return callback({state: true,posicion : respuesta.length});
            //aux = {state: true,posicion : respuesta}
        }
    }).catch((err) => {
        return callback({state: false, mensaje: err});
        //aux = {state: false, mensaje: err}
    })
    
}


productoModel.crear = function (post,callback) {
    const instancia = new myModel
    instancia.cod_prod = post.cod_prod
    instancia.nombre = post.nombre
    instancia.estado = post.estado

    instancia.save().then((respuesta)=>{
        if(respuesta.cod_prod) return callback({state: true, mensaje: 'Se creó el producto'})
            else return callback({state: false, mensaje: 'El código de producto tiene un máximo de 15 caracteres'})
    }).catch((err) => {
        return callback({state: false, mensaje: err})
    })

}



productoModel.validaParams = function(post, callback) {
    console.log("productoModel post.cod_cat ",post.cod_cat)

    var existeCat = categorias.findIndex((item) => item.cod_cat == post.cod_cat)
    
    console.log("aqui: ",post)
    if(!post.cod_prod){
        return callback({state: false, mensaje: 'El código de producto es obligatorio'});
    }
    if(!post.nombre){
        return callback({state: false, mensaje: 'El nombre del producto es obligatorio'});
    }


    if(post.cod_prod && (post.cod_prod.length>15 || post.cod_prod.length<1)){
        return callback({state: false, mensaje: 'El código de producto tiene un máximo de 15 caracteres'});
    }

    const regex = new RegExp(/^[a-zA-Z0-9 ]+$/);

    // Texto a validar
    const texto = post.cod_prod; // Aquí debes colocar el texto que deseas validar
    console.log(texto);
    // Validar si el texto contiene solo números
    const esValido = regex.test(texto);

    if (!esValido) {
        return callback({state: false, mensaje: 'El código de producto solo puede contener letras y/o números.'});
    } 

    if(post.nombre.length>50 || post.nombre.length<4){
        return callback({state: false, mensaje: 'El nombre de producto debe tener entre 4 y 50 caracteres'})
    }

    return callback({state: true});
    
}

productoModel.existeProducto = function(post, callback) {
    var existe = productos.findIndex((item) => item.nombre == post.nombre)
    if(existe== -1){
        return callback({state: false})
    }else{
        return callback({state: true})
    }

}

module.exports.productos = productoModel
