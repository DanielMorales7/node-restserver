import productModel from "../models/productModel.js";

// create product
const post_createProducts = async (req, res)=>{

    const {nombre, estado, usuario, ...data} = req.body; 

    const productDB = await productModel.findOne({nombre});

    if(productDB){

        return res.status(400).json({
            msg:`El producto ${productDB.nombre} ya existe`
        });
    }

    data.nombre= req.body.nombre.toUpperCase();
    data.usuario= req.user._id;

    try {
        
        const prodcut = new productModel(data);

        await prodcut.save();

        res.status(200).json({
            // products,
            // totaly
            prodcut
        });

    } catch (error) {

        console.log(error);

    }
}

// show all products
const get_Products = async (req, res) =>{

    const {limit=5, desde = 0} = req.query;

    try {

        const [totaly, products] = await  Promise.all([
            productModel.countDocuments({estado:true}),
            productModel.find({estado:true})
                .populate('usuario', 'nombre')
                .populate('categoria','nombre')
                .skip(Number(desde))
                .limit(Number(limit))
        ]);

        res.status(200).json({
            products,
            totaly
        });
        
    } catch (error) {
        
        console.log(error)
    }


}

// show a product
const get_Product = async (req, res) =>{

    const {id} = req.params;

    try {

        const product = await productModel.findById(id)
            .and({estado:true})
            .populate('usuario','nombre')
            .populate('categoria','nombre')
    
        res.status(200).json({
            product
        });
        
    } catch (error) {
        
        console.log(error);
    }
}

// update a product
const update_Product = async (req, res) =>{

    const {id} = req.params;

    try {
        
        const {estado, usuario, categoria, ...resto} = req.body;

        (resto.nombre) ? resto.nombre = resto.nombre.toUpperCase() : '';

        const updateProduct = await productModel.findByIdAndUpdate(id,resto,{new:true})

        res.status(200).json({
            updateProduct
        });
        
    } catch (error) {
        
        console.log(error);
        
    }
}

// delete a product
const delete_Product = async (req, res) =>{

    const {id} = req.params;

    try {
    
        const updateProduct = await productModel.findByIdAndUpdate(id,{estado:false},{new:true})

        res.status(200).json({
            msg:'El producto se ha eliminado correctamente'
        });

    } catch (error) {

        console.log(error);
    }
}

export {
    post_createProducts,
    get_Products,
    get_Product,
    update_Product,
    delete_Product
}