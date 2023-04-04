import usuarioModel from "../models/usuarioModel.js";
import bcryptjs from "bcryptjs"
import { generarJWT } from "../helpers/generar-jwt.js";
import { json, response } from "express";
import { googleVerify } from "../helpers/google-verify.js";

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
                msg:'Usuario / Password no son correctos - estado false'
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

const googleSignIn = async (req, res = response) =>{

    const {id_token} = req.body;

    try {
        
        const {nombre, img, correo} = await googleVerify(id_token);

        let usuario = await usuarioModel.findOne({correo});

        if(!usuario){

            const data = {
                nombre,
                correo,
                password:':p',
                img,
                google:true,
                rol:'USER_ROLE'
            }

            usuario = new usuarioModel(data);
            await usuario.save();

           console.log(usuario)
            
        }

        // Si el usuario en BD no está activo
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Hable con el administrador - usuario bloqueado'
            })
        }

        //Generar JWT -> se quiere regresar como una promesa

        const token = await generarJWT( usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        
        res.status(400).json({
            ok:false,
            msg:'El json no se pudo verificar'
        })
    }


}

export {
    post_login,
    googleSignIn
}