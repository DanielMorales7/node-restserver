import jwt from 'jsonwebtoken';
import usuarioModel from '../models/usuarioModel.js';

const validarJWT = async(req, res , next)=>{

    const token = req.header('x-token');
    
    if(!token){

        return res.status(401).json({
            msg:'No hay token en la petición'
        })
    }

    try {
        
        const {uid} = jwt.verify(token,process.env.SECRETPRIVATEKEY); //verifica que el JWT sea válido.

        // req.ui = uid; PruebaT-temp-2803
        const user = await usuarioModel.findById(uid);

        // validación si el usuario no existe

        if(!user){
            return res.status(401).json({
                msg:"Token no válido - Usuario no existe"
            })
        }

        //verificar si el usuario está activo

        if(!user.estado){
            return res.status(401).json({
                msg:'Token no válido - Usuario inactivo'
            })
        }

        req.user = user; //-> se mando el user por el request

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no válido'
        });
    }

}

export {validarJWT}