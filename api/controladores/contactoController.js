var contactoModel = require('../modelos/contactoModel').contactoModel;
var contactoController = {}

contactoController.save = function(req,res){


    var post = {
        email:req.body.email,
        numcontacto:req.body.numcontacto,
        id_tratamiento:req.body.id_tratamiento,
        descripcion:req.body.descripcion,
    };


    const camposObligatorios = ["email", "numcontacto", "id_tratamiento"];

    if(!validarObligatorios(camposObligatorios,post,res)) return false

    contactoModel.crear(post, function(resultado){
        if(resultado.state){
            console.log(resultado)
            res.json({state:true,mensaje:"Se registró correctamente"});
        } else{
            console.log(resultado)
            res.json({state:false,mensaje:"Error al registrar la información de contacto"});
        }

    })




}

contactoController.list = function(req,res){
    contactoModel.listData(null, function(respuesta){
        res.json(respuesta)
    })
}


contactoController.listId = function(req,res){

    var post = {
        _id: req.session._id
    }

    if(post._id == undefined || post._id == null || post.id == ""){
        res.json({state:false, mensaje:"el identificador es obligatorio", campo:"_id"})
    }

    contactoModel.listId(post,function(respuesta){
        res.json(respuesta)
    })

}



contactoController.update = function(req,res){

    var post = {
        _id:req.body._id,
        estado:req.body.estado,
    };

    const camposObligatorios = ["_id"];

    if(!validarObligatorios(camposObligatorios,post,res)) return false

    contactoModel.listId(post, function(resultado){
            
        if(resultado.posicion != -1){

            contactoModel.updateStatus(post, function(respuesta){
                if(respuesta.state){
                    res.json({state:true,mensaje:"Información de contacto actualizada correctamente"});
                } else{
                    res.json({state:false,mensaje:"Error al actualizar el estado"});
                }
            })
        }else {
            res.json({ state:false,mensaje: 'El _id del registro no es válido' });
            return false;
        }
    });
}

contactoController.delete = function(req,res){

    var post = {
        _id:req.body._id,
    };

    const camposObligatorios = ["_id"];

    if(!validarObligatorios(camposObligatorios,post,res)) return false

    contactoModel.listId(post, function(resultado){
            
        if(resultado.posicion != -1){


            contactoModel.delete(post, function(respuesta){
                if(respuesta.state){
                    res.json({state:true,mensaje:"Información de contacto eliminada correctamente"});
                } else{
                    res.json({state:false,mensaje:"Error al eliminar la información de contacto"});
                }
            })
            
        }else {
            res.json({ state:false,mensaje: 'El _id del registro no es válido' });
            return false;
        }
        
        
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


    


module.exports.contactoController = contactoController;