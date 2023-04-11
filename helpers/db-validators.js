import Role from "../models/rolModel.js";
import usuarioModel from "../models/usuarioModel.js";
import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";

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


export { 
    rolValidate,
    emailExist,
    userExist,
    categoryExist,
    productExist 
}