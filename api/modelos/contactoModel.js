
var contactoModel = {}

const mongoose = require("mongoose");

const Schema = mongoose.Schema

const contactochema = new Schema({
    email: {
        type: String,
        required: true
    },
    numcontacto: {
        type: String,
        required: true
    },
    id_tratamiento: {
        type: Schema.Types.ObjectId,
        ref: 'tratamientos',
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        required: true
    }
});




const myModel = mongoose.model('contacto',contactochema)


contactoModel.crear = function(post, callback) {
    const instancia = new myModel
    instancia.email=post.email
    instancia.numcontacto=post.numcontacto
    instancia.id_tratamiento=post.id_tratamiento
    instancia.descripcion=post.descripcion
    instancia.estado=1

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state : true})
    }).catch((error)=>{
        console.log(error)
        return callback({state: false, mensaje: error})
    })
}

contactoModel.list = function(post, callback){
    myModel.find({},{}).then((respuesta) => {
        return callback({state:true, data:respuesta})
    })
}

contactoModel.listData = function(post,callback) {
    console.log("listData post ",post)
    myModel.find({},{})
        .populate('id_tratamiento')
        .then((respuesta) => {
            return callback({ state: true, data: respuesta });
        })
        .catch((error) => {
            return callback({ state: false, error: error });
        });
};

contactoModel.listId = function(post, callback){
    myModel.find({_id:post._id},{}).then((respuesta) => {
        if(respuesta.length == 0){
            return callback({state: true,posicion : -1});
        }else {
            return callback({state: true,posicion : respuesta.length});

        }
    })
}

contactoModel.updateStatus = function(post, callback){
    console.log("---------------------update-------------")
    myModel.updateOne({_id:post._id},{
        estado:post.estado,

    }).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}
contactoModel.delete = function(post, callback){
    console.log("---------------------delete-------------")
    myModel.deleteOne({_id:post._id}).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}


module.exports.contactoModel = contactoModel