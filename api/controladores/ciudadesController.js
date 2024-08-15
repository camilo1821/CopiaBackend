var ciudadesModel = require('../modelos/ciudadModel').ciudadesModel;
var ciudadesController = {}

ciudadesController.list = function(req,res){
    ciudadesModel.list(null, function(respuesta){
        res.json(respuesta)
    })
}

module.exports.ciudadesController = ciudadesController;