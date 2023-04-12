import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
import usuarioModel from "../models/usuarioModel.js";
import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";

const coleccionesPermitidas = [
    'usuariomodels',
    'products',
    'categories',
    'roles'
];

// Función que busca usuarios por nombre o correo
const buscarUsuarios = async (termino ='', res) =>{

    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const usuario = await usuarioModel.findById(termino);
        return res.json({
            results:(usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i'); //--> expresión regular que hace insensible a mayúsculas y min

    // const usuarios = await usuarioModel.count
    // regresa cuantas coincidencias hay
    const usuarios = await usuarioModel.find({
        $or:[{nombre: regex}, {correo: regex}],
        $and:[{estado:true}]
    });

    res.json({
        results:usuarios
    })

}

//Función que busca por categoria
const buscarCategorias = async(termino = '', res) =>{

    const esMongoID = ObjectId.isValid(termino);  
    
    if(esMongoID){
        const categoria = await categoryModel.findById(termino);
        return res.json({
            results:(categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const categorias = await categoryModel.find({
        nombre: regex,
        $and:[{estado:true}]
    });

    res.json({
        results:categorias
    })

}

const buscarProductos = async(termino = '', res) =>{

    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const producto = await productModel.findById(termino);
        return res.json({
            results:(producto) ? [producto] : []
        })
    }

    const precioMax = 10000;
    const precioMin = 10;

    const regex = new RegExp(termino, 'i'); 

    const productos = await productModel.find({
        $or:[{nombre: regex}, {descripcion: regex}],
        $and:[{estado:true}],
        precio: { $gte: precioMin, $lte: precioMax }
    })
    .populate('categoria','nombre');

    res.json({
        results:productos
    })
}


const find = (req, res) =>{

    const {coleccion, termino} = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`Las colecciones permitidas son : ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuariomodels':
            buscarUsuarios(termino, res);
            break;
        case 'products':
            buscarProductos(termino,res);
            break;
        case 'categories':
            buscarCategorias(termino,res);
            break;
    
        default:
            res.status(500).json({
                msg:'No es la busqueda'
            })
            break;
    }
}

export {
    find
}