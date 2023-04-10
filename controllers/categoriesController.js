import categoryModel from "../models/categoryModel.js";
import mongoose from "mongoose";

// Obtener categorias - paginado - total -populate

const get_categories = async (req, res)=>{

    const {limit=5, desde = 0} = req.query;

    try {

        const [totaly, categories] = await  Promise.all([
            categoryModel.countDocuments({estado:true}),
            categoryModel.find({estado:true})
                .populate('usuario', 'nombre')
                // .populate({
                //     path:'usuario',
                //     model:'usuarioModel'
                // })
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

const get_category = async (req, res)=>{

    const {id} = req.params;

    try {

        const category = await categoryModel.findById(id)
            .and({estado:true})
            .populate('usuario','nombre')
    
        res.status(200).json({
            category
        });
        
    } catch (error) {
        
        console.log(error);
    }

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

const put_updateCategory = async (req, res) =>{

    const {id} = req.params;

    try {

        // ***** Verificar que el prodcuto esté true
        // if(!estado){
        //     return  res.status(400).json({
        //         msg:'No se puede actualizar el producto'
        //     });
        // }
        
        const {estado, usuario, ...resto} = req.body;

        resto.nombre = resto.nombre.toUpperCase();

        const updateCategory = await categoryModel.findByIdAndUpdate(id,resto,{new:true})

        res.status(200).json({
            updateCategory
        });
        
    } catch (error) {
        
        console.log(error);
        
    }

}

// Borrar categoria - cambiar a false

const delete_deleteCategory = async (req, res) =>{

    const {id} = req.params;

    try {
    
        const updateCategory = await categoryModel.findByIdAndUpdate(id,{estado:false},{new:true})

        res.status(200).json({
            msg:'La categoria se ha eliminado correctamente'
        });

    } catch (error) {

        console.log(error);
    }
}


export {
    get_categories,
    post_createCategory,
    get_category,
    put_updateCategory,
    delete_deleteCategory
}