import { Schema, model } from "mongoose";

const UsuarioSchema = Schema({

    nombre:{
        type: String,
        required:[true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required:[true, 'El correo es obligatorio'],
        unique:true
    },
    password:{
        type: String,
        required:[true, 'La contraseña es obligatoria'],
    },
    imagen:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
    
});

export default model('usuarioModel', UsuarioSchema);
