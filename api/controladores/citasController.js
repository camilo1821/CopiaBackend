var citasModel = require('../modelos/citasModel').citasModel;
var citasController = {}

citasController.save = function(req,res){


    var post = {
        id_ciudad:req.body.id_ciudad,
        id_depto:req.body.id_depto,
        id_usuarioCliente:req.body.id_usuarioCliente,
        id_tratamiento:req.body.id_tratamiento,
        fechayhora:req.body.fechayhora,
        estado:0,

    };


    const camposObligatorios = ["id_ciudad", "id_depto", "id_usuarioCliente", "id_tratamiento", "fechayhora"];

    if(!validarObligatorios(camposObligatorios,post,res)) return false

    citasModel.crear(post, function(resultado){
        if(resultado.state){
            console.log(resultado)
            res.json({state:true,mensaje:"Cita creada correctamente, La confirmación de la cita se hara de manera telefónica"});
        } else{
            console.log(resultado)
            res.json({state:false,mensaje:"Error al registrar la cita"});
        }

    })




}

citasController.buscarCitasUsuario = function(req,res){

    if(post.id_usuarioCliente == undefined || post.id_usuarioCliente == null || post.id_usuarioCliente == ""){
        res.json({state:false, mensaje:"el identificador es obligatorio", campo:"id_usuarioCliente"})
    }

    var post = {
        id_usuarioCliente: req.body.id_usuarioCliente
    }

    citasModel.buscarCitasCliente(post,function(respuesta){
        res.json(respuesta)
    })

}


citasController.list = function(req,res){
    citasModel.list(null, function(respuesta){
        res.json(respuesta)
    })
}


citasController.listId = function(req,res){

    var post = {
        _id: req.session._id
    }

    if(post._id == undefined || post._id == null || post.id == ""){
        res.json({state:false, mensaje:"el identificador es obligatorio", campo:"_id"})
    }

    citasModel.listId(post,function(respuesta){
        res.json(respuesta)
    })

}


citasController.listCompleto = function(req,res){

    var post = {
        _id: req.body._id
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        res.json({state:false, mensaje:"el identificador es obligatorio", campo:"_id"})
    }

    citasModel.listCompleto(post,function(respuesta){
        res.json(respuesta)
    })

}


citasController.listUsuario = function(req,res){

    var post = {
        _id_usuario: req.session._id
    }

    if(post._id_usuario == undefined || post._id_usuario == null || post._id_usuario == ""){
        res.json({state:false, mensaje:"el identificador es obligatorio", campo:"_id_usuario"})
    }

    citasModel.listUsuario(post,function(respuesta){
        res.json(respuesta)
    })

}


citasController.update = function(req,res){

    var post = {
        _id:req.body._id,
        id_ciudad:req.body.id_ciudad,
        id_depto:req.body.id_depto,
        id_usuarioCliente:req.body.id_usuarioCliente,
        id_tratamiento:req.body.id_tratamiento,
        fechayhora:req.body.fechayhora,
        estado:req.body.estado,
    };

    const camposObligatorios = ["_id"];

    if(!validarObligatorios(camposObligatorios,post,res)) return false

    citasModel.update(post, function(respuesta){
        if(respuesta.state){
            res.json({state:true,mensaje:"Cita actualizada correctamente"});
        } else{
            res.json({state:false,mensaje:"Error al actualizar la cita"});
        }
    })
}

citasController.delete = function(req,res){

    var post = {
        _id:req.body._id,
    };

    const camposObligatorios = ["_id"];

    if(!validarObligatorios(camposObligatorios,post,res)) return false

    citasModel.listId(post, function(resultado){
            
        if(resultado.posicion != -1){


            citasModel.delete(post, function(respuesta){
                if(respuesta.state){
                    res.json({state:true,mensaje:"Cita eliminada correctamente"});
                } else{
                    res.json({state:false,mensaje:"Error al eliminar la cita"});
                }
            })
            
        }else {
            res.json({ state:false,mensaje: 'El _id de la cita no es válido' });
            return false;
        }

        console.log(respuesta)
        
        
    });


    
}


validarObligatorios = function(camposObligatorios,post,res){
    for (let campo of camposObligatorios) {
        if (post[campo] === undefined || post[campo] === null || post[campo] === '') {
            res.json({ state: false, mensaje: `El campo ${campo} es obligatorio` });
            return false;
        }
    }
    return true;
}


    


module.exports.citasController = citasController;