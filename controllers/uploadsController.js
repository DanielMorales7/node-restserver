import fs from 'fs';
import path from 'path';
import {response} from 'express';
import { subirArchivo } from '../helpers/subir-archivo.js';
import { fileURLToPath } from 'url';
import * as Cloudinary from 'cloudinary';
import * as dotenv from 'dotenv';
dotenv.config();
Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure:true
});

import usuarioModel from "../models/usuarioModel.js";
import productModel from "../models/productModel.js";
import { model } from 'mongoose';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadFile = async(req, res =response) =>{
 
    /************ASI SE HACE DESDE EL CONTROLADOR PERO LO HICIMOS HELPER ***********/
        // const { archivo } = req.files;  // archivo: archivo que se subió

        // const nombreShort = archivo.name.split('.');

        // const extension = nombreShort[nombreShort.length-1];

        // //Validar la extension

        // const extValida = ['png','jpg','jpeg','git'];

        // if(!extValida.includes(extension)){
            
        //     return res.status(400).json({
        //         msg:`La extensión ${extension} no es permitida`
        //     })
            
        // }
        
        // const nombreTemp = uuidv4()+'.'+extension;
        // const uploadPath = path.join( __dirname, '../uploads/', nombreTemp );
        
        // // console.log(uploadPath);
    
        // archivo.mv(uploadPath, (err) => {
        //     if (err) {
        //     return res.status(500).json({err});
        //     } 
        //     res.json({ msg: 'Archivo subido correctamente' + uploadPath });
    
    // });


    try {
        // Se utiliza el try y catch porque el reject revienta el await
        // const nombre = await subirArchivo(req.files, ['png'], 'textos');
        
        // si quiero usar por defecto mando undefine
        const nombre = await subirArchivo(req.files, undefined, 'imgs');

        res.json({ nombre });
        
    } catch (msg) {
        
        res.status(400).json({msg})
    }
    
}

const actualizarImagen = async (req, res = response)=>{

    const {id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuariomodels':
            modelo = await usuarioModel.findById(id);
            console.log(modelo);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un usuario con el id ${id}`
                });
            }
        break;
        case 'products':
            modelo = await productModel.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                });
            }
        break;
    
        default:
            return res.status(500).json({msg: 'No se ha válidado'});
    }

    // LIMPIAR IMÁGENES PREVIAS

    if(modelo.img){
        //borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);

        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);

    if (!nombre) {
        return res.status(500).json({msg: 'Error al subir la imagen'});
    }

    console.log(nombre);

    modelo.img = nombre;

    await modelo.save();

    res.json(modelo);

}

const mostrarImagen = async (req, res)=>{

    const {id, coleccion} = req.params;

    const pathNotImg = path.join( __dirname, '../assets/no-image.jpg');

    let modelo;

    switch (coleccion) {
        case 'usuariomodels':
            modelo = await usuarioModel.findById(id);
            console.log(modelo);
            if(!modelo){
                return res.sendFile(pathNotImg);
            }
        break;
        case 'products':
            modelo = await productModel.findById(id);
            if(!modelo){
                return res.sendFile(pathNotImg);
            }
        break;
    
        default:
            return res.status(500).json({msg: 'No se ha válidado'});
    }

    // LIMPIAR IMÁGENES PREVIAS

    if(modelo.img){
        //borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);

        if(fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen);
        }
    }
    
    res.sendFile(pathNotImg);
}

const actualizarImagenCloudinary = async (req, res = response)=>{

    const {id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuariomodels':
            modelo = await usuarioModel.findById(id);
            console.log(modelo);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un usuario con el id ${id}`
                });
            }
        break;
        case 'products':
            modelo = await productModel.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                });
            }
        break;
    
        default:
            return res.status(500).json({msg: 'No se ha válidado'});
    }

    // LIMPIAR IMÁGENES PREVIAS

    if(modelo.img){
        //borrar la imagen del servidor
        const nombreArr   = modelo.img.split('/');
        const nombre      =  nombreArr[ nombreArr.length - 1];
        const [public_id] =  nombre.split('.');
        Cloudinary.uploader.destroy(public_id);
        
    }

    const {tempFilePath} = req.files.archivo;

    // regresa una promesa
    const {secure_url} = await Cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo);

}


export {
    uploadFile,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}