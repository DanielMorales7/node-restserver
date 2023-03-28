import usuarioModel from "../models/usuarioModel.js";
import bcryptjs from "bcryptjs"
import { generarJWT } from "../helpers/generar-jwt.js";

const post_login = async(req, res) =>{

    const {correo, password} = req.body;

    try {
        
        //Verificar si el email existe
        const user= await usuarioModel.findOne({correo});

        if(!user){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            });
        }

        //Si el usuario está activo

        if(!user.estado){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - false'
            });
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);  

        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password`'
            });
        }

        //Generar JWT -> se quiere regresar como una promesa

        const token = await generarJWT( user.id);

        res.json({
            user,
            token
        });
    

    } catch (error) {
        
        console.log(error)
        return res.status(500).json({
            msg:"Ocurrió un problema, comuniquese con el administrador"
        })
    }

}

export {
    post_login
}