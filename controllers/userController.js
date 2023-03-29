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

const get_users = async(req, res) => {

    // const {nombre, r ='no param'} = req.query;
    const {limit=5, desde = 0} = req.query;
    // const usuarios = await usuarioModel.find({estado:true})
    //     .skip(Number(desde))
    //     .limit(Number(limit));

    // const totally = await usuarioModel.countDocuments({estado:true});

    // ***** IMPORTANTE SI LA CONSULTA ANTERIOR DEPENDE DE LA OTRA ENTONCES COLOCAMOS AWAIT

    const [totally, users] = await Promise.all([
        usuarioModel.countDocuments({estado:true}),
        usuarioModel.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limit))
    ]);


    res.status(200).json({
        totally,
        users
    });
}

const put_users = async(req, res) => {

    let msg = '';

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    (resto.estado === undefined || (resto.estado === true )  ) ? msg = 'Se ha actualizado correctamente' : msg = 'Se ha borrado  correctamente';

    // TODO válidar contra BD PruebaT-temp-0322
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    try {
        
        const user = await usuarioModel.findByIdAndUpdate(id, resto, {new:true})

        //const userAuth = req.userAuth; -> se obtiene información especifica de un requesr
        
        res.status(200).json({
            
            msg,
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