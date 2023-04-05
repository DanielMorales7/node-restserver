import categoryModel from "../models/categoryModel.js";
import usuarioModel from "../models/usuarioModel.js";
import mongoose from "mongoose";

// Obtener categorias - paginado - total -populate

const get_categories = async (req, res)=>{

    const {limit=5, desde = 0} = req.query;

    try {

        const [totaly, categories] = await  Promise.all([
            categoryModel.countDocuments({estado:true}),
            categoryModel.find({estado:true})
                .populate('usuario')
                .populate({
                    path:'usuario',
                    model:'usuarioModel'
                })
                .skip(Number(desde))
                .limit(Number(limit))
        ]);

        res.status(200).json({
            categories,
            totaly
        });
        
    } catch (error) {
        
        console.log(error)
    }

}

// Obtener categoria - populate

const get_category = (req, res)=>{

    const {id} = req.params;

    res.json({
        msg:'Existe'
    });

}


const post_createCategory = async (req, res) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await categoryModel.findOne({nombre});

    if(categoriaDB){

        return res.status(400).json({
            msg:`La categoria ${categoriaDB.nombre} ya existe`
        });
    }

    // Generar la data a guardar

    const data = {
        nombre,
        usuario: req.user._id
    }

    console.log(data);

    const categoria = new categoryModel(data)

    //guardar DB

    await categoria.save();

    res.status(201).json(categoria);
}

// Actualizar categoria

// Borrar categoria - cambiar a false


export {
    get_categories,
    post_createCategory,
    get_category
}