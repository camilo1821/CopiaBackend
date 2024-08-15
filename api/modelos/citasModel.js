
var citasModel = {}

const mongoose = require("mongoose");

const Schema = mongoose.Schema

const citaSchema = new Schema({
    id_ciudad: {
        type: Schema.Types.ObjectId,
        ref: 'Ciudad',
        required: true
    },
    id_depto: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento',
        required: true
    },
    id_usuarioCliente: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    id_tratamiento: {
        type: Schema.Types.ObjectId,
        ref: 'tratamientos',
        required: true
    },
    fechayhora: {
        type: Date,
        required: true
    },
    estado: {
        type: Number,
        ref: 'Estado',
        required: true
    }
});




const myModel = mongoose.model('citas',citaSchema)


citasModel.crear = function(post, callback) {
    const instancia = new myModel
    instancia.id_ciudad=post.id_ciudad
    instancia.id_depto=post.id_depto
    instancia.id_usuarioCliente=post.id_usuarioCliente
    instancia.id_tratamiento=post.id_tratamiento
    instancia.fechayhora=post.fechayhora
    instancia.estado=post.estado

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state : true})
    }).catch((error)=>{
        console.log(error)
        return callback({state: false, mensaje: error})
    })
}


citasModel.buscarCitasCliente = function(post, callback) { //validar tambien cedula y correo

    myModel.find({id_usuarioCliente:post.id_usuarioCliente},{_id:1}).then(
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

citasModel.list = function(post, callback){
    myModel.find({},{})
    .populate('id_ciudad')       // Poblamos el campo id_ciudad con los datos de la colección Ciudad
    .populate('id_depto')        // Poblamos el campo id_depto con los datos de la colección Departamento
    .populate('id_usuarioCliente') // Poblamos el campo id_usuarioCliente con los datos de la colección Usuario
    .populate('id_tratamiento').then((respuesta) => {
        return callback({state:true, data:respuesta})
    })
}

citasModel.listCompleto = function(post,callback) {
    console.log("listCompleto post ",post)
    myModel.find({_id:post._id},{})
        .populate('id_ciudad')       // Poblamos el campo id_ciudad con los datos de la colección Ciudad
        .populate('id_depto')        // Poblamos el campo id_depto con los datos de la colección Departamento
        .populate('id_usuarioCliente') // Poblamos el campo id_usuarioCliente con los datos de la colección Usuario
        .populate('id_tratamiento')  // Poblamos el campo id_tratamiento con los datos de la colección Tratamiento
        .then((respuesta) => {
            return callback({ state: true, data: respuesta });
        })
        .catch((error) => {
            return callback({ state: false, error: error });
        });
};

citasModel.listId = function(post, callback){
    myModel.find({_id:post._id},{}).then((respuesta) => {
        return callback({ state: true, data: respuesta })
    })
}

citasModel.listUsuario = function(post,callback) {
    console.log("listUsuario post ",post)
    myModel.find({id_usuarioCliente:post._id_usuario},{})
        .populate('id_ciudad')       // Poblamos el campo id_ciudad con los datos de la colección Ciudad
        .populate('id_depto')        // Poblamos el campo id_depto con los datos de la colección Departamento
        .populate('id_usuarioCliente') // Poblamos el campo id_usuarioCliente con los datos de la colección Usuario
        .populate('id_tratamiento')  // Poblamos el campo id_tratamiento con los datos de la colección Tratamiento
        .then((respuesta) => {
            return callback({ state: true, data: respuesta });
        })
        .catch((error) => {
            return callback({ state: false, error: error });
        });
};

citasModel.update = function(post, callback){
    console.log("---------------------update-------------")
    myModel.updateOne({_id:post._id},{
        id_ciudad:post.id_ciudad,
        id_depto:post.id_depto,
        id_usuarioCliente:post.id_usuarioCliente,
        id_tratamiento:post.id_tratamiento,
        fechayhora:post.fechayhora,
        estado:post.estado,

    }).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}

citasModel.delete = function(post, callback){
    console.log("---------------------delete-------------")
    myModel.deleteOne({_id:post._id}).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}


module.exports.citasModel = citasModel