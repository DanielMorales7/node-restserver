import categoryModel from "../models/categoryModel.js";

const get_categories = (req, res)=>{

    res.json({
        msg:'Todo fine'
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

const get_category = (req, res)=>{

    res.json({
        msg:req.body
    });

}

export {
    get_categories,
    post_createCategory,
    get_category
}