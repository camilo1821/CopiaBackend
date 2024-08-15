var usuariosModel = require('../modelos/usuariosModel').usuariosModel;
var usuariosController = {}

usuariosController.save = function(req,res){

    
    var post = {
        usuario:req.body.usuario,
        clave: req.body.clave,
        nombre:req.body.nombre,
        apellidos:req.body.apellidos,
        cedula:req.body.cedula,
        correo:req.body.correo,
        telefono:req.body.telefono,
        direccion:req.body.direccion,
        imagen:req.body.imagen,
        rol:req.body.rol,
    };

    const camposObligatorios = ["usuario", "cedula", "nombre", "correo"];

    if(!validarObligatorios(camposObligatorios,post,res)) return false
    

    //calcular código activación
    var azar = "HMOD-"+Math.floor(Math.random() * (9999 - 1000) + 1000)
    post.azar = azar

    //validar tipos de usuario
console.log(">>>>>>>>>>>>>>",post)
    switch(post.rol){
        case 1:
            if(post.clave=='' || post.clave == null) post.clave = post.cedula
            break;
        case 2:
            if(post.clave=='' || post.clave == null) post.clave = post.cedula
            break;
        case 3:
            post.usuario=post.correo
            break;

    }

    //encriptación
    const pass = sha256(post.clave + config.passsha256)
    post.clave = pass;

    //crearCorreo
    const nodemailer = require("nodemailer")
    //config del transportador
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:config.usergmail,
            pass:config.passgmail 
        }
    })

    let mailOptions = {
        from: config.usergmail,
        to:post.correo,
        subject:"Verifica tu cuenta con el siguiente código: " + post.azar,
        html:`
        <!DOCTYPE html>
<html>
<head>
    <title>Activación de Cuenta</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border: 1px solid #dcdcdc; border-radius: 10px;">
        <h2 style="text-align: center; color: #333333;">Activación de Cuenta</h2>
        <p style="color: #333333;">Hola <strong>${post.nombre}</strong>,</p>

        <p style="color: #333333;">Puedes activar tu cuenta haciendo clic en el siguiente enlace:</p>
        <div style="text-align: center; margin: 20px 0;">
            <a href="http://localhost:3000/usuarios/activar/${post.correo}/${post.azar}" style="background-color: #ff6600; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Activar Cuenta</a>
        </div>
        <p style="color: #333333;">Si no solicitaste este correo, por favor ignóralo.</p>
        <p style="color: #333333;">Gracias,</p>
        <p style="color: #333333;">El equipo de Odontología H&M</p>
    </div>
</body>
</html>
<!doctype html>
<html lang="en">
  <body style="font-family: Helvetica, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.3; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f4f5f6; margin: 0; padding: 0;">
    Su código de activación es: ${post.azar}
    para activar haga clic en <a href='http://localhost:3000/usuarios/activar/${post.correo}/${post.azar}'>este_enlace</a>
  </body>
</html>`
    }

    
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            return console.log(error)
        }else{
            info
        }
    })



    


    usuariosModel.buscarUsuario(post, function(resultado){
            
        if(resultado.posicion == -1){

            usuariosModel.buscarCorreo(post, function(resultadoCorr){
                if(resultadoCorr.posicion == -1){
                    usuariosModel.crear(post, function(resultado){
                        if(resultado.state){
                            console.log(resultado)
                            res.json({state:true,mensaje:"Usuario creado correctamente"});
                        } else{
                            console.log(resultado)
                            res.json({state:false,mensaje:"Error al registrar el usuario"});
                        }
                
                    })
                }else {
                    res.json({ state:false,mensaje: 'El correo no es válido o ya existe, no se puede volver a registrar' });
                    return false;
                }
            });
        }else {
            res.json({ state:false,mensaje: 'El usuario ya existe, no se puede volver a registrar' });
            return false;
        }
        
        
    });


}

usuariosController.list = function(req,res){
    usuariosModel.list(null, function(respuesta){
        res.json(respuesta)
    })
}


usuariosController.listId = function(req,res){

    var post = {
        _id: req.body._id ? req.body._id : req.session._id
    }
    
    if(post._id == undefined || post._id == null || post.id == ""){
        res.json({state:false, mensaje:"el campo id del usuario es obligatorio", campo:"_id"})
    }


    usuariosModel.listId(post,function(respuesta){
        res.json(respuesta)
    })

}

usuariosController.listClientes = function(req,res){


    usuariosModel.listClientes(function(respuesta){
        res.json(respuesta)
    })

}

usuariosController.update = function(req,res){
    
    let post = {
        _id:req.body._id ? req.body._id : req.session._id,
        usuario:req.body.usuario,
        nombre:req.body.nombre,
        cedula:req.body.cedula,
        apellidos:req.body.apellidos,
        telefono:req.body.telefono,
        correo:req.body.correo,
        direccion:req.body.direccion,
        imagen:req.body.imagen,
        estado:req.body.estado,
        rol:req.body.rol,
    };
    if(req.body.clave){
        const pass = sha256(req.body.clave + config.passsha256)
        post.clave=pass
    }

    const camposObligatorios = ["_id"];

    if(!validarObligatorios(camposObligatorios,post,res)) return false

    usuariosModel.update(post, function(respuesta){
        if(respuesta.state){
            res.json({state:true,mensaje:"Usuario actualizado correctamente"});
        } else{
            res.json({state:false,mensaje:"Error al actualizar el usuario"});
        }
    })
}

usuariosController.delete = function(req,res){

    var post = {
        _id:req.body._id,
    };

    const camposObligatorios = ["_id"];

    if(!validarObligatorios(camposObligatorios,post,res)) return false

    usuariosModel.buscarId(post, function(resultado){
            
        if(resultado.posicion != -1){


            usuariosModel.delete(post, function(respuesta){
                if(respuesta.state){
                    res.json({state:true,mensaje:"Usuario eliminado correctamente"});
                } else{
                    res.json({state:false,mensaje:"Error al eliminar el usuario"});
                }
            })
            
        }else {
            res.json({ state:false,mensaje: 'El _id de usuario no existe' });
            return false;
        }

      
        
    });


    
}

usuariosController.login = function(req,res){


    var post = {
        usuario: req.body.usuario,
        clave: sha256(req.body.clave + config.passsha256),
    }

    const camposObligatorios = ["usuario","clave"];

    if(!validarObligatorios(camposObligatorios,post,res)) return false

    usuariosModel.login(post,function(respuesta){

        if(respuesta.state == true) {
            if(respuesta.data.length == 0){
                res.json({state: false, mensaje:"Error en las Credenciales de Acceso"})
            }else{
                
                if(respuesta.data[0].estado==0){
                    res.json({state: false, mensaje:"Su cuenta no ha sido activada, verifique su correo"})
                }else {
                    req.session._id = respuesta.data[0]._id
                    req.session.nombre = respuesta.data[0].nombre
                    req.session.correo = respuesta.data[0].correo
                    req.session.rol = respuesta.data[0].rol
                    res.json({state: true, mensaje:"Bienvenido " + respuesta.data[0].nombre})
                }
                
            }
        }
    })

}

usuariosController.activar = function(req,res){

    
     var post = {
        correo: req.params.correo,
        codigoact: req.params.codigoact
    };


    const camposObligatorios = ["correo","codigoact"];

    if(!validarObligatorios(camposObligatorios,post,res)) return false

    usuariosModel.activar(post, function(respuesta){
        if (respuesta.respuesta.modifiedCount == 0) {
            res.send(`


                <!DOCTYPE html>
                <html>
                <head>
                    <title>Activación de Cuenta</title>
                </head>
                <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0;">
                    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border: 1px solid #dcdcdc; border-radius: 10px;">
                        <h2 style="text-align: center; color: #333333;">Activación Fallida</h2>
                        <div style="text-align: center; margin: 20px 0;">
                            <span style="font-size: 24px; font-weight: bold; color: #ff6600;">Sus credenciales de activación son inválidas.</span>
                        </div>
                        
                    </div>
                </body>
                </html>

            `);
        } else if (respuesta.respuesta.modifiedCount == 1) {
            res.send(`


                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        
                        .link {
                            display: inline-block;
                            margin-top: 20px;
                            padding: 10px 20px;
                            background-color: #ff6600;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                    </style>
                    <title>Activación de Cuenta</title>
                </head>
                <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0;">
                    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border: 1px solid #dcdcdc; border-radius: 10px;">
                        <h2 style="text-align: center; color: #333333;">Cuenta activada</h2>
                        <div style="text-align: center; margin: 20px 0;">
                            <span style="font-size: 24px; font-weight: bold; color: #ff6600;">Cuenta activada correctamente.</span>
                        </div>
                        <a class="link" href="http://localhost:4200//login">Ir a Login</a>
                    </div>
                </body>
                </html>


            `);
        }
    })

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


    


module.exports.usuariosController = usuariosController;