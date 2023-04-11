import { Router } from "express";
import { check } from "express-validator";
import { get_Products, post_createProducts, get_Product, update_Product, delete_Product } from "../controllers/productsController.js";
import { categoryExist, productExist } from "../helpers/db-validators.js";


import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { isAdminRole } from "../middlewares/validar-roles.js";

const routerProducts = Router();

// Crear categoria - privado - cualquier persona con un token válido
routerProducts.route('/')
    .post([
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('categoria', 'No es un ID válido').isMongoId(),
        check('categoria').custom(categoryExist),
        validarCampos
    ],post_createProducts)


// Obtener todas las categorias - Publico
routerProducts.route('/')
    .get(get_Products)


// Obtener Producto
routerProducts.route('/:id')
    .get([
        check('id','No es un ID válido').isMongoId(),
        check('id').custom(productExist),
        validarCampos
    ],get_Product)

// Editar un producto
routerProducts.route('/:id')
    .put([
        validarJWT,
        check('id','No es un ID válido').isMongoId(),
        check('id').custom(productExist),
        validarCampos 
    ],update_Product)

// Eliminar un producto
routerProducts.route('/:id')
    .delete([
        validarJWT,
        isAdminRole,
        check('id','No es un ID válido').isMongoId(),
        check('id').custom(productExist),
        validarCampos
    ], delete_Product)

export default routerProducts