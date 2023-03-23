import Role from "../models/rolModel.js";
import usuarioModel from "../models/usuarioModel.js";

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

export { rolValidate, emailExist }