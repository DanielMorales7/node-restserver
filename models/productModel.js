import { Schema, model } from "mongoose";

const ProductSchema = Schema({

    nombre:{
        type: String,
        required:[true, 'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default:true,
        required:true
    },
    usuario:{
        type:Schema.ObjectId,
        ref:'usuarioModel',
        required:true
    },
    precio:{
        type: Number,
        default: 0
    },
    categoria:{
        type:Schema.ObjectId,
        ref:'Category',
        required:true
    },
    descripcion:{type:String},
    disponible:{ type: Boolean, default:true}
});

ProductSchema.methods.toJSON = function() {
    
    const { __v, estado, ...data} = this.toObject();
    return data;
}


export default model('Product', ProductSchema);