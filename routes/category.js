import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";

import { delete_deleteCategory, get_categories, get_category, post_createCategory, put_updateCategory } from "../controllers/categoriesController.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { categoryExist } from "../helpers/db-validators.js";
import { isAdminRole } from "../middlewares/validar-roles.js";


const routerCategory = Router();

// Obtener todas las categorias - Publico
routerCategory.route('/')
    .get(get_categories)

// Obtener una categoria por id - Publico

routerCategory.route('/:id')
    .get([
        check('id','No es un ID válido').isMongoId(),
        check('id').custom(categoryExist),
        validarCampos
    ],get_category)

// Crear categoria - privado - cualquier persona con un token válido
routerCategory.route('/')
    .post([
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],post_createCategory)

// Actualizar una categoria -privado - cualquier persona con un token válido
routerCategory.route('/:id')
    .put([
    validarJWT,
    check('id','No es un ID válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(categoryExist),
    validarCampos  
    ], put_updateCategory)

// Borrar Categoria - solo un admin
routerCategory.route('/:id')
    .delete([
        validarJWT,
        isAdminRole,
        check('id','No es un ID válido').isMongoId(),
        check('id').custom(categoryExist),
        validarCampos
    ], delete_deleteCategory);

export default routerCategory;