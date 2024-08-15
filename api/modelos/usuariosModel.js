
var usuariosModel = {}

const mongoose = require("mongoose");

const Schema = mongoose.Schema

const usuariosSchema = new Schema({
    usuario: {
        type: String,
        required: true
    },
    clave: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String
    },
    cedula: {
        type: String,
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: String
    },
    direccion: {
        type: String
    },
    imagen: {
        type: String
    },
    estado: {
        type: Number
    },
    codigoact: {
        type: String
    },
    rol: {
        type: Number
    }
});

const myModel = mongoose.model('usuarios',usuariosSchema)

usuariosModel.buscarUsuario = function(post, callback) { //validar tambien cedula y correo

    myModel.find({usuario:post.usuario},{usuario:1,_id:0}).then(
        (respuesta) => {
        console.log("find: ",respuesta)

        if(respuesta.length == 0){
            return callback({state: true,posicion : -1});
        }else {
            return callback({state: true,posicion : respuesta.length});

        }
    }).catch((err) => {
        return callback({state: false, mensaje: err,posicion : 0 });

    })
    
}

usuariosModel.buscarCorreo = function(post, callback) { //validar tambien cedula y correo
console.log(post)
    myModel.find({correo:post.correo},{correo:1,_id:0}).then(
        (respuesta) => {
        console.log("findCorreo: ",respuesta)

        if(respuesta.length == 0){
            return callback({state: true,posicion : -1});
        }else {
            return callback({state: true,posicion : respuesta.length});

        }
    }).catch((err) => {
        return callback({state: false, mensaje: err,posicion : 0 });

    })
    
}

usuariosModel.login = function(post, callback) { 

    myModel.find({usuario:post.usuario,clave:post.clave},{ nombre:1, rol:1, estado:1 }).then(
        (respuesta) => {
        console.log("find: ",respuesta)
        return callback({state: true,data: respuesta});

    }).catch((err) => {
        return callback({state: false, mensaje: err });

    })
    
}

usuariosModel.buscarId = function(post, callback) { 

    myModel.find({_id:post._id},{usuario:1,_id:0}).then(
        (respuesta) => {
        console.log("find: ",respuesta)

        if(respuesta.length == 0){
            return callback({state: true,posicion : -1});
        }else {
            return callback({state: true,posicion : respuesta.length});

        }
    }).catch((err) => {
        return callback({state: false, mensaje: err,posicion : 0 });

    })
    
}


usuariosModel.list = function(post, callback){
    myModel.find({},{}).then((respuesta) => {
        return callback({state:true, data:respuesta})
    })
}

usuariosModel.listId = function(post, callback){
    myModel.find({_id:post._id},{}).then((respuesta) => {
        return callback({ state: true, data: respuesta })
    })
}

usuariosModel.listClientes = function(callback){
    myModel.find({rol:3,estado:1},{_id:1, nombre:1, apellidos:1, cedula:1, correo:1, telefono:1}).then((respuesta) => {
        return callback({ state: true, data: respuesta })
    })
}

usuariosModel.crear = function(post, callback) {
    const instancia = new myModel
    instancia.usuario=post.usuario
    instancia.clave=post.clave
    instancia.nombre=post.nombre
    instancia.apellidos=post.apellidos
    instancia.cedula=post.cedula
    instancia.correo=post.correo
    instancia.telefono=post.telefono
    instancia.estado=0
    instancia.codigoact=post.azar
    instancia.rol=post.rol
    instancia.direccion=post.direccion
    instancia.imagen=post.imagen
   
    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state : true})
    }).catch((error)=>{
        console.log(error)
        return callback({state: false, mensaje: error})
    })
}

usuariosModel.validaParams = function(post, callback) {



    if(post.usuario && (post.usuario.length>30 || post.usuario.length<5)){
        return callback({state: false, mensaje: 'El campo usuario debe tener entre 5 y 30 caracteres'});
    }

    if(post.nombre && (post.nombre.length>30 || post.nombre.length<5)){
        return callback({state: false, mensaje: 'El nombre del usuario debe tener entre 2 y 30 caracteres'});
    }

    if(post.apellidos && (post.apellidos.length>30 || post.apellidos.length<2)){
        return callback({state: false, mensaje: 'El apellido del usuario debe tener entre 2 y 30 caracteres'});
    }

    if(post.correo && (post.correo.length>30 || post.correo.length<2)){
        return callback({state: false, mensaje: 'El correo del usuario debe tener entre 5 y 50 caracteres'});
    }

    if(post.cedula && (post.cedula.length>15 || post.cedula.length<6)){
        return callback({state: false, mensaje: 'La cedula del usuario debe tener entre 6 y 15 caracteres'});
    }

    const regexNum = new RegExp(/^[0-9]+$/);
    const esValido = regexNum.test(post.cedula);
    if(post.cedula && !esValido){
        return callback({state: false, mensaje: 'La cedula solo puede contener números'});
    }

    if(post.telefono && (post.telefono.length>20)){
        return callback({state: false, mensaje: 'El telefono debe tener máximo 20 caracteres'});
    }

    const esValido2 = regexNum.test(post.telefono);
    if(post.telefono && !esValido2){
        return callback({state: false, mensaje: 'El telefono solo puede contener números'});
    }

    return callback({state: true});
    
}

usuariosModel.update = function(post, callback){
    console.log("---------------------update-------------")
    myModel.updateOne({_id:post._id},{
        usuario:post.usuario,
        nombre:post.nombre,
        cedula:post.cedula,
        apellidos:post.apellidos,
        correo:post.correo,
        telefono:post.telefono,
        clave:post.clave,
        estado:post.estado,
        rol:post.rol,
    }).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}

usuariosModel.activar = function(post, callback){
    console.log("---------------------activar-------------")
    myModel.updateOne({correo:post.correo,codigoact:post.codigoact},{
        estado:1,
    }).then((respuesta) => {
        return callback({ state: true, respuesta:respuesta })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}


usuariosModel.delete = function(post, callback){
    console.log("---------------------delete-------------")
    myModel.deleteOne({_id:post._id}).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}


module.exports.usuariosModel = usuariosModel