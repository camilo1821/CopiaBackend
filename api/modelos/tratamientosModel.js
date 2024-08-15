
var tratamientosModel = {}

const mongoose = require("mongoose");

const Schema = mongoose.Schema

const tratamientosSchema = new Schema({
    codigo: {
        type: String,
        required: true
    },nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    precio: {
        type: Number,
        required: true
    },
    estado: {
        type: Number,
        required: true
    }

});



const myModel = mongoose.model('tratamientos',tratamientosSchema)


tratamientosModel.crear = function(post, callback) {
    const instancia = new myModel
    instancia.codigo=post.codigo
    instancia.nombre=post.nombre
    instancia.descripcion=post.descripcion
    instancia.precio=post.precio
    instancia.estado=post.estado


    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state : true})
    }).catch((error)=>{
        console.log(error)
        return callback({state: false, mensaje: error})
    })
}

tratamientosModel.list = function(post, callback){
    myModel.find({},{}).then((respuesta) => {
        return callback({state:true, data:respuesta})
    })
}

tratamientosModel.listId = function(post, callback){
    myModel.find({_id:post._id},{}).then((respuesta) => {
        return callback({ state: true, data: respuesta })
    })
}



tratamientosModel.update = function(post, callback){
    console.log("---------------------update-------------")
    myModel.updateOne({_id:post._id},{
        codigo:post.codigo,
        nombre:post.nombre,
        descripcion:post.descripcion,
        precio:post.precio,
        estado:post.estado,

    }).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}



tratamientosModel.delete = function(post, callback){
    console.log("---------------------delete-------------")
    myModel.deleteOne({_id:post._id}).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}


module.exports.tratamientosModel = tratamientosModel