var departamentosModel = {}

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deptoSchema = new Schema({
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
    }
}, {
    collection: 'departamentos' // Especificar el nombre de la colección
});


const myModel= mongoose.model('Departamento', deptoSchema);
module.exports = myModel;

departamentosModel.list = function(post, callback){
    myModel.find({},{}).then((respuesta) => {
        return callback({state:true, data:respuesta})
    })
}


module.exports.departamentosModel = departamentosModel