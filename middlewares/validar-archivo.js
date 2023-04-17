const validarArchivo = (req, res, next)=>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {    // req.files: archivos que se subieron, si no hay archivos subidos, entonces no se sube nada
        return res.status(500).json({
            msg:'No se subió ningún archivo'
        });
    }

    next();
}

export {validarArchivo}