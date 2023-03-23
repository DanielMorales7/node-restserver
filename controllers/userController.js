import { response, request } from "express";
import usuarioModel from "../models/usuarioModel.js";
import bcryptjs from "bcryptjs"


// Send a user to DB
const post_users = async (req, res, next) => {

    const {nombre, correo, password, rol} = req.body;

    try {
        
        const user = new usuarioModel({nombre, correo, password, rol});

        // Verificar si el correo existe

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        
        // // guardar en BD
        
        await user.save(req.body);
        
        res.json({user});

    } catch (error) {
        console.log(error);
        next();
    }

}

const get_users = (req, res) => {

    const {nombre, r ='no param'} = req.query;

    res.status(200).json({
        "msg":"Controller- API",
        nombre,
        r
    });
}

const put_users = async(req, res) => {

    const {id} = req.params;
    const {password, google, correo, ...resto} = req.body;

    // TODO válidar contra BD
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    try {
        
        const user = await usuarioModel.findByIdAndUpdate(id, resto, {new:true})
        
        res.status(200).json({
            "msg":"El usuario ha sido actualizado",
            user
        });

    } catch (error) {

        console.log(error);
        next();

    }

}

const delete_users = (req, res) => {
    res.status(200).json({
        "msg":"get API"
    });
}

const patch_users = (req, res) => {
    res.status(200).json({
        "msg":"get API"
    });
}

export {
    get_users,
    put_users,
    post_users,
    delete_users,
    patch_users
}