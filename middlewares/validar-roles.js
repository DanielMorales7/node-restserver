import { response } from "express";

const isAdminRole = (req, res = response, next) =>{

    // en el Middleware anterior se estableción la req con el usuario por lo tanto se puede usar en el siguiente middleware

    if(!req.user){
        return res.status(500).json({
            msg:'se quiere verificar el rol sin validar el token primero'
        });
    }

    const {rol, nombre} = req.user;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - No tiene permiso para realizar la acción`
        });
    }
    next();

}

// cuando el operador spreed está en el argumento, agrupa la información enviada
const roleExist = (...roles)=>{

    
    // paso los roles pero un middleware regresa una función por eso se hace el return
    return(req, res = response, next) =>{

        if(!req.user){
            return res.status(500).json({
                msg:'se quiere verificar el rol sin validar el token primero'
            });
        }

        // console.log(roles, req.user.rol);

        if(!roles.includes(req.user.rol)){
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles ${roles}`
            });
        }

        next();
    }
}

export {isAdminRole, roleExist}