import Role from "../models/rolModel.js";
import usuarioModel from "../models/usuarioModel.js";
import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import { Error } from "mongoose";

const rolValidate = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    console.log(existeRol);
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const emailExist = async(correo='') =>{

    const existeEmail = await usuarioModel.findOne({correo});

    if(existeEmail){
        throw new Error(`El correo ${correo} ya existe en la BD`);
    }
}

const userExist = async(id) =>{

    const existeUsuario = await usuarioModel.findById(id);

    if(!existeUsuario){
        throw new Error(`El usuario ${id} no existe en la BD`);
    }
}


const categoryExist = async (id) =>{

    const existeCategoria = await categoryModel.findById(id)

    if(!existeCategoria){
        throw new Error(`La categoria ${id} no existe en la BD`);
    }
}

const productExist = async (id) =>{

    const existeProducto = await productModel.findById(id)

    if(!existeProducto){
        throw new Error(`El producto ${id} no existe en la BD`);
    }
}

const coleccionAllowed = (coleccion='', colecciones=[])=>{

    const incluida = colecciones.includes(coleccion);

    if(!incluida){
        throw new Error(`La colección ${coleccion} no es permitida`);
    }

    return true;
}


export { 
    rolValidate,
    emailExist,
    userExist,
    categoryExist,
    productExist,
    coleccionAllowed
}