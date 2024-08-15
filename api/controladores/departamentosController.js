var departamentosModel = require('../modelos/departamentoModel').departamentosModel;
var departamentosController = {}

departamentosController.list = function(req,res){
    departamentosModel.list(null, function(respuesta){
        res.json(respuesta)
    })
}

module.exports.departamentosController = departamentosController;