import { Schema, model } from "mongoose";

const CategorySchema = Schema({

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
    }
});

CategorySchema.methods.toJSON = function() {
    
    const { __v, estado, ...data} = this.toObject();
    return data;
}


export default model('Category', CategorySchema);