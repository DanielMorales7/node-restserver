import { response, request } from "express";
import usuarioModel from "../models/usuarioModel.js";
import bcryptjs from "bcryptjs"

// Send a user to DB
const post_users = async (req, res, next) => {

    const {nombre, correo, password, rol} = req.body;

    try {
        
        const user = new usuarioModel({nombre, correo, password, rol});

        // Verificr si el correo existe

        res.json({user});
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        // // guardar en BD

        await user.save(req.body);


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

const put_users = (req, res) => {

    const {id} = req.params;

    res.status(200).json({
        "msg":req.body,
        id
    });
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