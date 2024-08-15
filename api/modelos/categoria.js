//cod_cat: maximo 5 caracteres, solo números, y es un campo obligatorio, 
//nombre: obligatorio, máximo 50 caracteres, mínimo 3 caracteres, 
//estado: solo acepta valores True o False y es un campo obligatorio

var categoriaModel ={}

categoriaModel.validaParams = function(post, callback) {

    if(!post.cod_cat || post.cod_cat == '' || Number(post.cod_cat) == 0){
        return callback({state: false, mensaje: 'el campo cod_cat es obligatorio', campo: "cod_cat"})
    }
    else if(post.cod_cat.length>5 || post.cod_cat.length<3){
        return callback({state: false, mensaje: 'el campo cod_cat debe tener maximo 5 caracteres', campo: "cod_cat"})
    }else if(isNaN(post.cod_cat)){
        return callback({state: false, mensaje: 'el campo cod_cat debe tener ser numerico', campo: "cod_cat"});
    }

    if(!post.nombre || post.nombre == ''){
        return callback({state: false, mensaje: 'el campo nombre es obligatorio', campo: "nombre"})
    }
    else if(post.nombre.length>50 ){
        return callback({state: false, mensaje: 'el campo nombre debe tener maximo 50 caracteres', campo: "nombre"})
    }
    else if(post.nombre.length<3){
        return callback({state: false, mensaje: 'el campo nombre debe tener minimo 3 caracteres', campo: "nombre"})
    }

    

    if(!post.estado || post.estado == ''){
        return callback({state: false, mensaje: 'el campo estado es obligatorio', campo: "estado"})
    }
    else if(post.estado.toString()!='true' && post.estado.toString()!='false'){
        return callback({state: false, mensaje: 'el campo estado es debe ser true o false', campo: "estado"})
    }


    return callback({state: true});

}

categoriaModel.existeCategoria = function(post, callback) {
    var existe = categorias.findIndex((item) => item.cod_cat == post.cod_cat || item.nombre == post.nombre)
    if(existe== -1){
        return callback({state: false})
    }else{
        return callback({state: true})
    }

}

module.exports.categorias = categoriaModel