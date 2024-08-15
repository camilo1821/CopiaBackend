
var imagesController = {}



imagesController.Avatar = function(req,res){

    var post = {
        _id:req.session._id
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        res.json({state:false, mensaje:"el campo _id es obligatorio"})
        return false
    }

    try {

        var upload = multer({
            storage : multer.diskStorage({
                destination:(req,file,cb) => {
                    cb(null,raiz + "/uploads/")
                },
                filename:(req,file,cb) => {
                    cb(null,post._id + '.png')
                }
            }),
            fileFilter: function(req,file,cb){
                var ext = path.extname(file.originalname)

                var misextensiones = ['.png','.jpeg','.gif','.jpg','.tif']

                if(misextensiones.indexOf(ext) == -1){
                    return cb({state:false,mensaje:"Extensión de archivo no válida, solo se admiten las siguientes: "+ misextensiones.join(" | ")},null)
                }
                cb(null,true)

            }
        }).single('image')

        upload(req,res, function(err){

            if(err){
                res.json({state:false, error:err})
            } else {
                res.json({state:true, mensaje:"archivo cargado correctamente"})
            }
        })

    
    } catch (error) {
        res.json({state:false, error:error})
        
    }
}


module.exports.imagesController = imagesController;