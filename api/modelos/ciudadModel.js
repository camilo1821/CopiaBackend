var ciudadesModel = {}

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ciudadSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    },
    codigo: {
        type: String,
        required: true,
        unique: true,
        maxlength: 3
    },
    codigo_depto: {
        type: String,
        required: true
    }
}, {
    collection: 'ciudades'
});


const myModel= mongoose.model('Ciudad', ciudadSchema);
module.exports = myModel;

ciudadesModel.list = function(post, callback){
    myModel.find({},{}).then((respuesta) => {
        return callback({state:true, data:respuesta})
    })
}

module.exports.ciudadesModel = ciudadesModel